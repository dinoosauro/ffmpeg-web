import UpdateJsonProperties from "../UpdateJSONProperties";

// See the $effects in `App.svelte` for the logic used to save this object in the LocalStorage every time it's changed.

let MergeOptions = {
    fileName: "",
    keepAlbumArt: false
}
if (localStorage.getItem("ffmpegWeb-SavePreferences") !== "a") {
    const json = JSON.parse(localStorage.getItem("ffmpegWeb-LastMergeSettings") ?? "{}");
    MergeOptions = UpdateJsonProperties(json, MergeOptions);
}
let state = $state(MergeOptions);
export default state;