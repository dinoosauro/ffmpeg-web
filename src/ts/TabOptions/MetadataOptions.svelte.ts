import UpdateJsonProperties from "../UpdateJSONProperties";

// See the $effects in `App.svelte` for the logic used to save this object in the LocalStorage every time it's changed.

interface Metadata {
    keepCurrentMetadata: boolean;
    keepMP4Thumbnail: boolean;
    metadataAdded: { key: string, value: string, id: string, custom?: boolean }[],
    customAlbumArt: File | false,
    deleteVideo: boolean
}
let MetadataOptions: Metadata = {
    keepCurrentMetadata: true,
    keepMP4Thumbnail: true,
    customAlbumArt: false,
    deleteVideo: false,
    metadataAdded: []
}
if (localStorage.getItem("ffmpegWeb-SavePreferences") !== "a") {
    const json = JSON.parse(localStorage.getItem("ffmpegWeb-LastMetadataEditOptions") ?? "{}");
    MetadataOptions = UpdateJsonProperties(json, MetadataOptions);
}
let state = $state(MetadataOptions);
export default state;