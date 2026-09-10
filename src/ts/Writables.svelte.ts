import { get, writable } from "svelte/store";
import ConversionOptions from "./TabOptions/ConversionOptions.svelte";
import Settings from "./TabOptions/Settings.svelte";

interface FileUrls {
    name: string,
    path: string
}

const obj = $state({
/**
 * If the video source must be copied or not.
 * This writable is used so that the UI can be updated with the required settings for video copy
 */
reEncodeVideo: ConversionOptions.videoTypeSelected === "copy",
/**
 * The progress of the [x] operation, from 0 to 1.
 */
conversionProgress: [0],
/**
 * The last 50 console strings of the [x] operation
 */
conversionText: [[""]],
/**
 * Information about all the operations that were started
 */
conversionFileDone: {
    /**
     * An array that indicates, for each operation number, the position of the file that is being converteed
     */
    currentFile: [] as number[],
    /**
     * An array that indicates, for each operation number, the number of files to convert
     */
    maxFiles: [] as number[],
    /**
     * An array that indicates, for each operation number, the name of the file that is being currently converted
     */
    fileNames: [] as string[],
    /**
     * An array that indicates, for each operation number, the start conversion number of the file.
     */
    startDate: [] as number[]
},  
/**
 * The ID of the current conversion
 */
currentConversionValue: 0,
/**
 * A Date.now() of the last time the operation failed, so that the script can know if a conversion was successful, and if it's possible to fetch that file
 */
conversionFailedDate: 0,
/**
 * The section that the user has chosen from the "What do you want to do?" slider
 */
applicationSection: "MediaEnc",
/**
 * If [it's possible to use the slider values, the audio is lossless]
 */
audioBitrateSettings: ([false, false]),
/**
 * The selected image format, so that the "higher bitrate on the left" or the "lower bitrate on the left" cann be updated
 */
imageFormatSelected: (ConversionOptions.imageTypeSelected),
/**
 * If a string (the file name) is provided, the "Overwrite file?" dialog will be shown.
 */
showOverwriteDialog: undefined as string | undefined,
/**
 * How the file should be saved to the file system
 */
currentStorageMethod: Settings.storageMethod,
/**
 * Information about the screensaver object
 */
screensaverInfo: { enabled: false, activationTime: Date.now() } as {
    /**
     * If the screensaver should be shown or not
     */
    enabled: boolean,
    /**
     * The Date.now() of when the screensaver was enabled, so that it cannot be dismissed before 1s
     */
    activationTime: number
},
/**
 * The URLs and the file name of the exported content via a link
 */
fileUrls: [] as FileUrls[],
/**
 * If files should be saved in memory or not
 */
changedFileSave: Settings.fileSaver.keepInMemory,
/**
 * The version of FFmpeg that is being used, so that more options can be shown depending on it
 */
ffmpegVersionUsed: Settings.version,
/**
 * If the "Installation" card, that provides information on how to install ffmpeg-web on Electron or as a Progressive Web App, should be shown
 */
showInstallationCard: Settings.showInstallationPrompt,
/**
 * Show the "ffmpeg-web has been updated" dialog
 */
updateDialogShown: (localStorage.getItem("ffmpegWeb-LastVersion") || window.ffmpegWebVersion) !== window.ffmpegWebVersion, // Set the current version
/**
 * If the user should be able to change the buffer size of the encoder
 */
showBufSize: (Settings.hardwareAcceleration.type === "vaapi" || Settings.hardwareAcceleration.type === "nvidia" || Settings.hardwareAcceleration.type === "amd"),
/**
 * The keys that are being pressed in the document
*/
currentlyPressedKeys: ([]) as string[],
/**
 * The object that'll contain the custom image for the "Audio to video section", if the user has chosen to use it.
*/
albumToVideoBackground: { img: undefined } as {img: HTMLImageElement | undefined}
});

localStorage.setItem("ffmpegWeb-LastVersion", window.ffmpegWebVersion);

window.addEventListener("keydown", (e) => {
    const newPrev = [...obj.currentlyPressedKeys, e.key.toLowerCase()];
    newPrev.indexOf("meta") !== -1 && newPrev.indexOf("p") !== -1 && e.preventDefault(); // Disable printing (since it's useless on this website, and it would interfere with the "Show settings" shortcut)
    obj.currentlyPressedKeys = newPrev;
});
window.addEventListener("keyup", (e) => {
    obj.currentlyPressedKeys.splice(obj.currentlyPressedKeys.indexOf(e.key.toLowerCase()), 1);
});


export default obj;