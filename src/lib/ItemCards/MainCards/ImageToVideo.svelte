<script>
    import { getLang } from "../../../ts/LanguageAdapt";
    import ConversionOptions from "../../../ts/TabOptions/ConversionOptions";
    import AdaptiveAsset from "../../UIElements/AdaptiveAsset.svelte";
    import Card from "../../UIElements/Card/Card.svelte";
    import Switch from "../../UIElements/Switch.svelte";
    import BitrateSelection from "../BitrateSelection.svelte";
    import MediaEncoding from "./MediaEncoding.svelte";
</script>

<div class="flex hcenter wcenter" style="gap: 10px">
    <AdaptiveAsset asset="filmstripimage"></AdaptiveAsset>
    <h2>{getLang("Image to video")}:</h2>
</div>
<p>
    {getLang(
        "Here you can change the output video settings. When you're ready, choose some files from the \"File Selection\" tab. You'll be able to change their order and their duration later.",
    )}
</p>
<Card type={1}>
        <div class="flex hcenter" style="gap: 10px">
        <AdaptiveAsset asset="video"></AdaptiveAsset>
        <h3>{getLang("Video output:")}</h3>
    </div>
    <Card>
        <MediaEncoding showOnlyVideo={true} isMinimal={true}></MediaEncoding>
        <h4 style="margin-top: 0px;">{getLang("Bitrate")}:</h4>
        <BitrateSelection embedded={true} type="video"></BitrateSelection>
    </Card>
</Card>
