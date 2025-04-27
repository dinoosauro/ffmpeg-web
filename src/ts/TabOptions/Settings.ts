import type { ChipInterface } from "../../interfaces/chip";
import UpdateJsonProperties from "../UpdateJSONProperties";

let Settings = {
    version: typeof window.nativeOperations === "undefined" ? "0.11.x" : "native",
    storageMethod: "link",
    useMultiThreaded: true,
    enableWorkerFS: true,
    backgroundContent: {
        type: "color",
        refreshImage: 5000,
        effects: {
            blur: 16,
            brightness: 100
        },
        allowCardBlur: false
    },
    screenSaver: {
        enabled: false,
        timeout: 30000,
        type: "color",
        refreshImage: 5000,
        effects: {
            blur: 16,
            brightness: 100
        },
        options: {
            showConversionName: true,
            showConversionStatus: true,
            fullscreen: true,
            moveContent: 30000
        },
    },
    fileSaver: {
        keepInMemory: true,
        revokeObjectUrl: false
    },
    hardwareAcceleration: {
        type: "none",
        additionalProps: [] as ChipInterface[],
        audioToolbox: false
    },
    alerts: {
        time: 5000,
        ignored: [] as string[],
        show: true
    },
    language: "en",
    saveInputs: true,
    exit: {
        afterFile: true,
        afterTimestamp: false
    },
    showInstallationPrompt: true
}
const json = JSON.parse(localStorage.getItem("ffmpegWeb-LastGeneralSettings") ?? "{}");
Settings = UpdateJsonProperties(json, Settings);
window.addEventListener("beforeunload", () => localStorage.setItem(`ffmpegWeb-LastGeneralSettings`, JSON.stringify(Settings)));

export default Settings;