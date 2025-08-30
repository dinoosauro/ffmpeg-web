import CreateTopDialog from "../CreateTopDialog";
import FfmpegHandler from "../FFmpegUtils/FFmpegBuilder";
import ffmpeg from "../FFmpegUtils/FFmpegClass";
import FFmpegFileNameHandler from "../FFmpegUtils/FFmpegHandleFileName";
import { getLang } from "../LanguageAdapt";
import FileSaver from "../SaveFile";
import ConversionOptions from "../TabOptions/ConversionOptions";
import Settings from "../TabOptions/Settings";
import { conversionFileDone } from "../Writables";
interface FileStorage {
    files: {
        file: File,
        duration: number
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
    const options = { ...ConversionOptions };
    const obj = new ffmpeg("0.12.x", true);
    await obj.promise;
    await obj.load();
    const hwOptions = new FfmpegHandler(obj).hardwareAcceleration(false, {video: options.imageToVideo.videoBitrate});
    console.log(hwOptions);
    if (hwOptions.after.length === 0) hwOptions.after.push("-b:v", options.imageToVideo.videoBitrate, "-vcodec", options.videoTypeSelected);
    CreateTopDialog(`${getLang("Started operation")} ${obj.operationId}! ${getLang(`Change the Operation ID from the "Conversion Status" tab to see the current progress.`)}`, "OperationStarted");
    const fileSave = new FileSaver(Settings.storageMethod, handle);
    await fileSave.promise;
    for (const { file } of files) await obj.writeFile(file);
    const output = `__FfmpegWebExclusive__ImageToVideoOutput__${crypto.randomUUID()}.mp4`;
    const outputTxtFileName = `__FfmpegWebExclusive__ImageToVideoMergeList__${crypto.randomUUID()}.txt`;
    if (options.imageToVideo.enableTransition) {
        const loopText = files.map(i => ["-loop", "1", "-t", i.duration.toString(), "-i", FFmpegFileNameHandler(i.file)]).flat();
        let [filterComplexMerge, filterComplexFade] = ["", ""];
        for (let i = 0; i < files.length; i++) {
            filterComplexMerge += `[${i}:v]scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2[v${i}];`;
            if (i + 1 !== files.length) filterComplexFade += `[v${i === 0 ? "0" : `${i - 1}${i}`}][v${i + 1}]xfade=transition=fade:duration=1:offset=${(files[i].duration - 1) * (i + 1)}[${i + 2 === files.length ? "vout]" : `v${i}${i + 1}];`}`
        }
        await obj.exec([...hwOptions.beginning, ...loopText,
            "-r", options.imageToVideo.fps.toString(),
            "-filter_complex", `${filterComplexMerge}${filterComplexFade}`,
            "-map", "[vout]",
            "-pix_fmt", "yuv420p",
            ...hwOptions.after,
            output]);
    } else {
        let text = "";
        for (let i = 0; i < files.length; i++) {
            const newStr = `file '${FFmpegFileNameHandler(files[i].file)}'\nduration ${i === 0 ? +files[i].duration + 1 : files[i].duration}\n`; // FFmpeg subtracts a second for the first image, so we need to add it to balance the clip's length.
            text += newStr;
            if (i === (files.length - 1) && files.length === 2) text += newStr; // For some reason, FFmpeg.WASM sometimes cuts the last image. Since we'll already trim the video with the second conversion, we don't care if FFmpeg will actually add the last image two times or not
        }
        console.log(text);
        const file = new File([text], outputTxtFileName);
        await obj.writeFile(file, true);
        await obj.exec([...hwOptions.beginning, "-f",
            "concat",
            "-safe", "0",
            "-i", FFmpegFileNameHandler(file),
            "-r", "1",
            "-vf", `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`,
            "-pix_fmt", "yuv420p",
            ...hwOptions.after,
            output]);
    }
    const file = await obj.readFile(output);
    file instanceof Uint8Array ? await fileSave.write(file, `${FFmpegFileNameHandler(files[0].file).substring(0, FFmpegFileNameHandler(files[0].file).lastIndexOf("."))}.mp4`) : await fileSave.native(output, `${FFmpegFileNameHandler(files[0].file).substring(0, FFmpegFileNameHandler(files[0].file).lastIndexOf("."))}.mp4`);
    for (const file of [output, ...files.map(i => FFmpegFileNameHandler(i.file))]) await obj.removeFile(file);
    obj.exit();
    await fileSave.release();
    conversionFileDone.update((val) => {
        val[obj.operationId][0] = -1; // With "-1", the conversion is marked as completed
        return [...val];
    })
    CreateTopDialog(`${getLang("Completed operation")} ${obj.operationId}`, "OperationCompleted");

}