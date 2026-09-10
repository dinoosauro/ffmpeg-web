import Settings from "../TabOptions/Settings.svelte";
/**
 * According to the properties available of the file, get the path that'll be used for the FFmpeg command.
 * @param file the File object that'll be used for getting the path
 * @returns the path to use for FFmpeg
 */
export default function FFmpegFileNameHandler(file: File, customExtension?: string) {
    const suggestedVersion = Settings.version as "0.11.x" | "native";
    if (!(file instanceof File)) return changeCustomExtension(file, customExtension);
    return changeCustomExtension((suggestedVersion === "native" ? window.nativeOperations.getFilePath(file) : undefined) || file.webkitRelativePath || file.name, customExtension);
}

/**
 * Change the file extension if a string is provided.
 * @param str the file path
 * @param extension the extension that should be replaced. If nullish, str will be returned.
 * @returns The file name to use.
 */
function changeCustomExtension(str: string, extension?: string) {
    if (!extension) return str;
    return `${str.substring(0, str.lastIndexOf("."))}.${extension}`;
}