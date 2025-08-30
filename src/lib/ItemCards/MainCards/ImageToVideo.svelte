<script>
    import { getLang } from "../../../ts/LanguageAdapt";
    import ConversionOptions from "../../../ts/TabOptions/ConversionOptions";
    import AdaptiveAsset from "../../UIElements/AdaptiveAsset.svelte";
    import Card from "../../UIElements/Card/Card.svelte";
    import BitrateSelection from "../BitrateSelection.svelte";
    import MediaEncoding from "./MediaEncoding.svelte";

</script>
<div class="flex hcenter wcenter" style="gap: 10px">
    <AdaptiveAsset asset="audionote2play"></AdaptiveAsset>
    <h2>{getLang("Image to video:")}</h2>
</div>
<p>
    {getLang(
        "Here you can change the output video settings. When you're ready, choose some files from the \"File Selection\" tab. You'll be able to change their order and their duration.",
    )}
</p>
        <MediaEncoding isMinimal={true}></MediaEncoding><br />
        <Card type={1}>
            <h3>Video bitrate:</h3>
            <Card>
                <BitrateSelection type="video"></BitrateSelection>
            </Card>
        </Card>
