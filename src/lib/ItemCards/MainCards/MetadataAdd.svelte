<script>
    import { GetImage } from "../../../ts/ImageHandler";
    import { getLang } from "../../../ts/LanguageAdapt";
    import MetadataOptions from "../../../ts/TabOptions/MetadataOptions.svelte";
    import AdaptiveAsset from "../../UIElements/AdaptiveAsset.svelte";
    import Switch from "../../UIElements/Switch.svelte";
</script>

<div class="flex hcenter wcenter" style="gap: 10px">
    <AdaptiveAsset asset="documentsearch"></AdaptiveAsset>
    <h2>{getLang("Add metadata:")}</h2>
</div>
<p>
    {getLang(
        "You can edit metadata tags directly from FFmpeg, without re-encoding the file. Choose the metadata from the next tab.",
    )}
</p>
<br />
<Switch
    text={getLang("Keep current metadata")}
    checked={MetadataOptions.keepCurrentMetadata}
    onchange={enabled => (MetadataOptions.keepCurrentMetadata = enabled)}
></Switch><br />
<Switch
    text={getLang("Keep album art in MP4 files, disabling custom tags")}
    checked={MetadataOptions.keepMP4Thumbnail}
    onchange={enabled => (MetadataOptions.keepMP4Thumbnail = enabled)}
></Switch><br />
