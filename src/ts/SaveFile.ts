import type { IpcRenderer } from "electron/renderer";
import type JSZip from "jszip";
import Settings from "./TabOptions/Settings";
import { fileUrls } from "./Writables";
import type { ZipWriterStream } from "@zip.js/zip.js";

interface DirectoryPicker {
    id?: string,
    mode?: string
}
interface SaveFilePicker extends BaseFilePicker {
    id?: string,
}
interface BaseFilePicker {
    suggestedName?: string,
    types?: {
        description: string,
        accept: {}
    }[]
}

declare global {
    interface Window {
        showDirectoryPicker: ({ id, mode }: DirectoryPicker) => Promise<FileSystemDirectoryHandle>,
        showSaveFilePicker: ({ id, suggestedName, types }: SaveFilePicker) => Promise<FileSystemFileHandle>
        nativeOperations: IpcRenderer,
        isLocal: boolean | undefined,
        ffmpegWebVersion: string
    }
}
/**
 * Save, or move (if using native version), a file
 */
export default class FileSaver {
    #suggestedOutput: "handle" | "zip" | "link" | "zipjs" = "link";
    #directoryHandle: FileSystemDirectoryHandle | undefined;
    #jsZip: JSZip | undefined;
    #zipJs: {
        ZipObject: ZipWriterStream,
        id?: string
    } | undefined;
    promise: Promise<void> | undefined;
    /**
     * Specify how the file should be saved. Note that you also need to await `this.promise` before starting using it.
     * @param suggested the suggested download method (`handle`, `zip`, `link`, `zipjs`)
     * @param handle the FileSystemDirectoryHandle for FS operation
     */
    constructor(suggested?: "handle" | "zip" | string, handle?: FileSystemDirectoryHandle) {
        this.promise = new Promise(async (resolve) => {
            this.#directoryHandle = handle;
            switch (suggested) {
                case "handle": {
                    this.#suggestedOutput = handle instanceof FileSystemDirectoryHandle ? "handle" : "link";
                    break;
                }
                case "zip": {
                    this.#suggestedOutput = "zip";
                    const jszip = await import("jszip");
                    this.#jsZip = new jszip.default();
                    break;
                }
                case "zipjs": { // A zip file will be generated as a script and downloaded with a Service Worker. In this way, we can save lots of RAM
                    this.#suggestedOutput = "zipjs";
                    const zipjs = await import("@zip.js/zip.js");
                    /**
                     * The stream of the zip file
                     */
                    const stream = new zipjs.ZipWriterStream();
                    let channel: BroadcastChannel | undefined = undefined;
                    /**
                     * The ID that'll be used to identify the current zip file with the Service Worker. This is required only if the user doesn't use the File System API
                     */
                    let id: string | undefined = undefined;
                    /**
                     * If a WritableStream has been generated from the File System API
                     */
                    let successPicker = false;
                    if (typeof window.showSaveFilePicker !== "undefined") { // Try saving a file
                        try {
                            const handle = await window.showSaveFilePicker({
                                id: "FFmpegWeb-SaveFile", suggestedName: `FFmpegWeb-Zip-${Date.now()}.zip`, types: [
                                    {
                                        description: "Zip File",
                                        accept: {
                                            "application/zip": [".zip"]
                                        }
                                    }
                                ]
                            });
                            stream.readable.pipeTo(await handle.createWritable());
                            successPicker = true;
                        } catch (ex) {
                            console.warn(ex);
                        }
                    }
                    if (!successPicker) { // Use the service worker to download
                        await new Promise<void>(async (res) => {
                            id = crypto?.randomUUID() ?? Math.random().toString();
                            channel = new BroadcastChannel("comms");
                            channel.onmessage = (msg) => {
                                switch (msg.data.action) {
                                    case "SuccessStream": // The TransformStream has been created in the Service Worker
                                        if (msg.data.id === id) {
                                            stream.readable.pipeTo(new WritableStream({ // Pipe the ZipStream to a WritableStream, that'll send every chunk to the Service Worker
                                                write: (chunk) => {
                                                    navigator.serviceWorker.controller?.postMessage({ action: "WriteChunk", id, chunk });
                                                },
                                                close: () => {
                                                    navigator.serviceWorker.controller?.postMessage({ action: "CloseStream", id });
                                                }
                                            }));
                                            /**
                                             * Add an iFrame to the page to download the file. 
                                             * This seems to work only on Safari, since it causes Chrome to crash and Firefox to block the resource. 
                                             * I think that's the second time something works on Safari and not on Chrome, really surprised since usually it's the other way around.
                                             */
                                            function iFrameFallback() {
                                                const iframe = document.createElement("iframe");
                                                iframe.src = `${window.location.href}${window.location.href.endsWith("/") ? "" : "/"}downloader?id=${id}`;
                                                iframe.style = "width: 1px; height: 1px; position: fixed; top: -1px; left: -1px;"
                                                console.log(iframe);
                                                document.body.append(iframe);
                                            }
                                            if (!(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))) { // Quick method to detect if Safari is being used. If not, open a pop-up window to download it (since otherwise it would fail).
                                                const win = window.open(`${window.location.href}${window.location.href.endsWith("/") ? "" : "/"}downloader?id=${id}`, "_blank", "width=200,height=200");
                                                if (!win) alert("A pop-up window was blocked. Please open it so that the download can start.");
                                                (new Blob(["This file was automatically generated to close your browser's pop-up window. You can safely delete it."])).stream().pipeTo(stream.writable("_.txt"));
                                            } else iFrameFallback();
                                            channel?.close();
                                            res();
                                        }
                                        break;
                                }
                            }
                            navigator.serviceWorker.controller?.postMessage({ action: "CreateStream", id });
                        })
                    }
                    this.#zipJs = {
                        ZipObject: stream,
                        id,
                    }
                    break;
                }
                default:
                    this.#suggestedOutput = "link";
                    break;
            }
            resolve();
        })
    }
    /**
     * Replace the unsafe characters of a string
     * @param str the unsanitized string
     * @param allowSlash if the / shouldn't be replaced
     * @returns the sanitized string
     */
    sanitize = (str: string, allowSlash?: boolean) => {
        return str.replaceAll("<", "‹").replaceAll(">", "›").replaceAll(":", "∶").replaceAll("\"", "″").replaceAll("/", allowSlash ? "/" : "∕").replaceAll("\\", "∖").replaceAll("|", "¦").replaceAll("?", "¿").replaceAll("*", "")
    }
    /**
     * Write, or start downloading, a file
     * @param file the Uint8Array of the file to write
     * @param name the file name
     * @param forceLink if a link must be downloaded, even if the default settings is `handle` or `zip`
     */
    write = async (file: Uint8Array | Blob, name: string, forceLink?: boolean) => {
        function downloadLink() {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(file instanceof Blob ? file : new Blob([file]));
            Settings.fileSaver.keepInMemory && fileUrls.update((val) => {
                val.push({ name, path: a.href });
                return [...val];
            })
            a.download = name;
            a.click();
            if (Settings.fileSaver.revokeObjectUrl) URL.revokeObjectURL(a.href);
        }
        if (forceLink) { downloadLink(); return };
        switch (this.#suggestedOutput) {
            case "link": {
                downloadLink();
                break;
            }
            case "zip": {
                if (!this.#jsZip) throw new Error("Zip file must be initialized. Please await this.promise");
                this.#jsZip.file(this.sanitize(name, true), file, { createFolders: true });
                break;
            }
            case "zipjs": {
                if (!this.#zipJs) throw new Error("Zip file must be initialized. Please await this.promise");
                (file instanceof Blob ? file.stream() : new ReadableStream({
                    start(controller) {
                        controller.enqueue(file);
                        controller.close();
                    }
                })).pipeTo(this.#zipJs.ZipObject.writable(this.sanitize(name, true)));
                break;
            }
            case "handle": {
                if (!this.#directoryHandle) throw new Error("If user rejects the showDirectoryPicker request, the suggestedOutput must be changed to link or zip.")
                const fileSplit = name.split("/");
                const fileName = fileSplit.pop() ?? crypto.randomUUID();
                let tempHandle = this.#directoryHandle;
                for (let remainingPath of fileSplit) tempHandle = await tempHandle.getDirectoryHandle(remainingPath, { create: true });
                const systemFile = await tempHandle.getFileHandle(this.sanitize(fileName), { create: true });
                const writable = await systemFile.createWritable();
                await writable.write(file);
                await writable.close();
                break;
            }
        }
    }
    /**
     * Move a file from a directory to another (native-only)
     * @param copyFile the path of the file to copy
     * @param suggestedName the suggested name to the file
     * @param firstFilePath the path of the first file, that'll be used to get the directory where the file should be copied. If it's not provided, only the `copyFile` path will be used.
     */
    native = async (copyFile: string, suggestedName: string, firstFilePath?: string) => {
        if (firstFilePath) {
            if (firstFilePath.indexOf("\\") !== -1) firstFilePath = firstFilePath.substring(0, firstFilePath.lastIndexOf("\\") + 1);
            if (firstFilePath.indexOf("/") !== -1) firstFilePath = firstFilePath.substring(0, firstFilePath.lastIndexOf("/") + 1);
        }
        await window.nativeOperations.invoke("MoveFile", { from: copyFile, to: `${firstFilePath ?? ""}${suggestedName}` });
    }
    /**
     * Save the zip file
     */
    release = async () => {
        if (this.#suggestedOutput === "zip" && this.#jsZip) {
            const zip = await this.#jsZip.generateAsync({ type: "blob" });
            await this.write(zip, `FFmpegWeb-Zip-${Date.now()}.zip`, true);
        } else if (this.#suggestedOutput === "zipjs" && this.#zipJs) {
            await this.#zipJs.ZipObject.close();
        }
    }
}