import UpdateStorage from "../Storage/UpdateStorage";
import UpdateJsonProperties from "../UpdateJSONProperties";
import Settings from "./Settings";

let MergeOptions = {
    fileName: "",
    keepAlbumArt: false
}
if (localStorage.getItem("ffmpegWeb-SavePreferences") !== "a") {
    const json = JSON.parse(localStorage.getItem("ffmpegWeb-LastMergeSettings") ?? "{}");
    MergeOptions = UpdateJsonProperties(json, MergeOptions);
}
MergeOptions = UpdateStorage(MergeOptions, "ffmpegWeb-LastMergeSettings");
export default MergeOptions;