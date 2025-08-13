import UpdateStorage from "../Storage/UpdateStorage";
import UpdateJsonProperties from "../UpdateJSONProperties";
import Settings from "./Settings";

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
MetadataOptions = UpdateStorage(MetadataOptions, "ffmpegWeb-LastMetadataEditOptions");
export default MetadataOptions;