import CreateTopDialog from "../CreateTopDialog";
import FfmpegHandler from "../FFmpegUtils/FFmpegBuilder";
import ffmpeg from "../FFmpegUtils/FFmpegClass";
import FFmpegFileNameHandler from "../FFmpegUtils/FFmpegHandleFileName";
import { getLang } from "../LanguageAdapt";
import FileSaver from "../SaveFile";
import Settings from "../TabOptions/Settings.svelte";
import Writables from "../Writables.svelte";

/**
 * Convert media to an image
 * @param files the array of Files to elaborate
 * @param handle if provided, the files will be saved using the File System API
 */
export default async function ImageLogic(files: File[], handle?: FileSystemDirectoryHandle) {
    const obj = new ffmpeg(Settings.version as "0.11.x");
    await obj.promise;
    CreateTopDialog(`${getLang("Started operation")} ${obj.operationId + 1}! ${getLang(`Change the Operation ID from the "Conversion Status" tab to see the current progress.`)}`, "OperationStarted");
    const ffmpegOperation = new FfmpegHandler(obj);
    const fileSave = new FileSaver(Settings.storageMethod, handle);
    await fileSave.promise;
    for (let oldFile of files) {
        // Update the writable that contains all the information about this conversion with the file progress and its name
        if (!Writables.conversionFileDone.currentFile[obj.operationId]) { // Initialize the entries
            Writables.conversionFileDone.currentFile[obj.operationId] = 0;
            Writables.conversionFileDone.maxFiles[obj.operationId] = files.length;
            Writables.conversionFileDone.fileNames[obj.operationId] = "";

        } 
        Writables.conversionFileDone.currentFile[obj.operationId]++;
        Writables.conversionFileDone.fileNames[obj.operationId] = oldFile.name;
        Writables.conversionFileDone.startDate[obj.operationId] = Date.now();
        ffmpegOperation.addFiles([oldFile]); // Add files in the FFmpeg WebAssembly's virtual FS.
        const build = ffmpegOperation.build(true); // Get the output script
        /**
         * And start the FFmpeg process
         * If the output file is a Uint8Array, the result is from FFmpeg WebAssembly, and it'll be written using standard JavaScript APIs. Otherwise, it's a path for the native FFmpeg process, and it'll be moved using Node's FS API.
        */
        try {
            for (const { file, extension } of await ffmpegOperation.start(build)) file instanceof Uint8Array ? await fileSave.write(file, `${FFmpegFileNameHandler(oldFile).substring(0, FFmpegFileNameHandler(oldFile).lastIndexOf("."))}.${extension}`) : await fileSave.native(file, `${oldFile.name.substring(0, oldFile.name.lastIndexOf("."))}.${extension}`, obj.operationId, window.nativeOperations.getFilePath(oldFile));
        } catch (ex) {
            console.warn(ex);
            break;
        }
        ffmpegOperation.operationComplete(); // Delete the downloaded items from the list
        await obj.removeFile(oldFile); // And remove the source files from the FS.
        Settings.exit.afterFile && obj.exit(); // Exit from FFmpeg
    }
    await fileSave.release(); // Save .zip file if necessary
    !Settings.exit.afterFile && obj.exit();
    Writables.conversionFileDone.currentFile[obj.operationId] = -1; // With "-1", the conversion is marked as completed
    CreateTopDialog(`${getLang("Completed operation")} ${obj.operationId}`, "OperationCompleted");

}