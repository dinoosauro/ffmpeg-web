import type { ChipInterface } from "../../interfaces/chip";

// See the $effects in `App.svelte` for the logic used to save this object in the LocalStorage every time it's changed.

let InputOptions: { val: ChipInterface[] } = { val: [] };
if (localStorage.getItem("ffmpegWeb-SavePreferences") !== "a") {
    try {
        const recoverSettings = JSON.parse(localStorage.getItem("ffmpegWeb-LastInputStorage") ?? `{"val": []}`);
        if (Array.isArray(recoverSettings.val)) for (let item of recoverSettings.val) typeof item.display === "string" && typeof item.id === "string" && InputOptions.val.push(item);
    } catch (ex) {
        console.warn("Failed settings recovery");
    }
}
let state = $state(InputOptions);
export default state;