import CreateTopDialog from "../CreateTopDialog";
import FfmpegHandler from "../FFmpegUtils/FFmpegBuilder";
import ffmpeg from "../FFmpegUtils/FFmpegClass";
import FFmpegFileNameHandler from "../FFmpegUtils/FFmpegHandleFileName";
import { getLang } from "../LanguageAdapt";
import FileSaver from "../SaveFile";
import ConversionOptions from "../TabOptions/ConversionOptions";
import EncoderInfo from "../TabOptions/EncoderInfo";
import Settings from "../TabOptions/Settings";
import { conversionFileDone } from "../Writables";
interface FileStorage {
    files: {
        file: File,
        duration: number,
        transition: string,
        transitionDuration: number
    }[],
    width: number,
    height: number
}


/**
 * Convert media to an image
 * @param files the array of Files to elaborate
 * @param handle if provided, the files will be saved using the File System API
 */
export default async function ImageToVideoLogic({ files, width, height }: FileStorage, handle?: FileSystemDirectoryHandle) {
    const options = JSON.parse(JSON.stringify(ConversionOptions)) as typeof ConversionOptions; // Deep clone user preferences
    const obj = new ffmpeg(Settings.version === "native" ? "native" : "0.12.x", true);
    await obj.promise;
    await obj.load();
    // We'll now get the possible hardware acceleration arguments to add to FFmpeg
    const hwOptions = new FfmpegHandler(obj).hardwareAcceleration(false);
    const encoderInfo = EncoderInfo.video.get(options.videoTypeSelected);
    const outputCodec = encoderInfo ? encoderInfo[obj.native ? Settings.hardwareAcceleration.type as "nvidia" : "NoHardwareAcceleration"] ?? options.videoTypeSelected : options.videoTypeSelected;
    hwOptions.after.unshift("-b:v", options.videoOptions.value, "-vcodec", outputCodec);
    CreateTopDialog(`${getLang("Started operation")} ${obj.operationId}! ${getLang(`Change the Operation ID from the "Conversion Status" tab to see the current progress.`)}`, "OperationStarted");
    const fileSave = new FileSaver(Settings.storageMethod, handle);
    await fileSave.promise;
    for (const { file } of files) await obj.writeFile(file);
    /**
     * The file name of the output video
     */
    const output = `__FfmpegWebExclusive__ImageToVideoOutput__${crypto.randomUUID()}.mp4`;
    /**
     * The file name of the output txt file used to merge files, only if no transitions have been added.
     */
    const outputTxtFileName = `__FfmpegWebExclusive__ImageToVideoMergeList__${crypto.randomUUID()}.txt`;
    /**
     * The scaling filter to apply for the current conversion.
     */
    const scaleText = options.imageToVideo.shouldFill ? `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}` : `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2` 
    if (files.some(i => i.transition !== "none")) { // We'll need to use complex filters here 
        const loopText = files.map(i => ["-loop", "1", "-t", i.duration.toString(), "-i", FFmpegFileNameHandler(i.file)]).flat();
        let [filterComplexMerge, filterComplexFade] = ["", ""];
        /**
         * The offset of the previous animation
         */
        let prevXfadeOffset = 0;
        for (let i = 0; i < files.length; i++) {
            filterComplexMerge += `[${i}:v]${scaleText}[v${i}];`;
            if (i + 1 !== files.length) {
                prevXfadeOffset += (files[i].duration - (files[i].transition === "none" ? 0 : files[i].transitionDuration)); // 1 = xfade duration
                filterComplexFade += `[v${i === 0 ? "0" : `${i - 1}${i}`}][v${i + 1}]${files[i].transition !== "none" ? `xfade=transition=${files[i].transition}:duration=${files[i].transitionDuration}:offset=${prevXfadeOffset}` : ""}[${i + 2 === files.length ? "vout]" : `v${i}${i + 1}];`}`
            }
        }
        await obj.exec([...hwOptions.beginning, ...loopText,
            "-r", options.imageToVideo.fps.toString(),
            "-filter_complex", `${filterComplexMerge}${filterComplexFade}${obj.native && Settings.hardwareAcceleration.type === "vaapi" ? ";[vout]format=nv12,hwupload[outv]" : ""}`,
            "-map", obj.native && Settings.hardwareAcceleration.type === "vaapi" ? "[outv]" : "[vout]",
            "-pix_fmt", "yuv420p",
            ...hwOptions.after,
            output]);
    } else { // We can use the standard concat filter
        let text = "";
        for (let i = 0; i < files.length; i++) {
            const newStr = `file '${Settings.enableWorkerFS && !obj.native ? "mount/" : ""}${FFmpegFileNameHandler(files[i].file)}'\nduration ${i === 0 ? +files[i].duration + 1 : files[i].duration}\n`; // FFmpeg subtracts a second for the first image, so we need to add it to balance the clip's length.
            text += newStr;
            if (i === (files.length - 1) && files.length === 2) text += newStr; // For some reason, FFmpeg.WASM sometimes cuts the last image. Since we'll already trim the video with the second conversion, we don't care if FFmpeg will actually add the last image two times or not
        }
        const file = new File([text], outputTxtFileName);
        await obj.writeFile(file, true);
        await obj.exec([...hwOptions.beginning, "-f",
            "concat",
            "-safe", "0",
            "-i", FFmpegFileNameHandler(file),
            "-r", !ConversionOptions.imageToVideo.force1FpsVideo ? options.imageToVideo.fps.toString() : "1",
            "-vf", scaleText,
            "-pix_fmt", "yuv420p",
            ...hwOptions.after,
            output]);
        await obj.removeFile(file);
    }
    const file = await obj.readFile(output);
    file instanceof Uint8Array ? await fileSave.write(file, `${FFmpegFileNameHandler(files[0].file).substring(0, FFmpegFileNameHandler(files[0].file).lastIndexOf("."))}.mp4`) : await fileSave.native(output, `${FFmpegFileNameHandler(files[0].file).substring(0, FFmpegFileNameHandler(files[0].file).lastIndexOf("."))}.mp4`);
    for (const file of files) await obj.removeFile(file.file);
    await obj.removeFile(output, true);
    obj.exit();
    await fileSave.release();
    conversionFileDone.update((val) => {
        val[obj.operationId][0] = -1; // With "-1", the conversion is marked as completed
        return [...val];
    })
    CreateTopDialog(`${getLang("Completed operation")} ${obj.operationId}`, "OperationCompleted");

}