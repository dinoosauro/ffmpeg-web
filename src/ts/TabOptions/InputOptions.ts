import type { ChipInterface } from "../../interfaces/chip";
import UpdateStorage from "../Storage/UpdateStorage";
import Settings from "./Settings";

let InputOptions: { val: ChipInterface[] } = { val: [] };
if (localStorage.getItem("ffmpegWeb-SavePreferences") !== "a") {
    try {
        const recoverSettings = JSON.parse(localStorage.getItem("ffmpegWeb-LastInputStorage") ?? `{"val": []}`);
        if (Array.isArray(recoverSettings.val)) for (let item of recoverSettings.val) typeof item.display === "string" && typeof item.id === "string" && InputOptions.val.push(item);
    } catch (ex) {
        console.warn("Failed settings recovery");
    }
}
InputOptions = UpdateStorage(InputOptions, "ffmpegWeb-LastInputStorage");
export default InputOptions;