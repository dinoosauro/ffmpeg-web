<script>
    import { getLang } from "../../ts/LanguageAdapt";
    import ConversionOptions from "../../ts/TabOptions/ConversionOptions.svelte";
    import Writables from "../../ts/Writables.svelte";
    import AdaptiveAsset from "../UIElements/AdaptiveAsset.svelte";
    import Card from "../UIElements/Card/Card.svelte";
    import Switch from "../UIElements/Switch.svelte";
    import Settings from "../../ts/TabOptions/Settings.svelte"
</script>

<Card>
    <div class="flex hcenter wcenter" style="gap: 10px">
        <AdaptiveAsset asset="imagesparkle"></AdaptiveAsset>
        <h2>{getLang("Image to video options:")}</h2>
    </div>
    <p>{getLang("Here you can change some things about the image conversion.")}</p>
    <Card type={1}>
        <div class="flex hcenter" style="gap: 8px">
            <AdaptiveAsset asset="fps60"></AdaptiveAsset>
            <h3>{getLang("FPS")}</h3>
        </div>
        <label class="flex hcenter" style="gap: 10px">
            {getLang("FPS of the output video")}:
            <input
                type="number"
                bind:value={ConversionOptions.imageToVideo.fps}
            />
        </label><br />
        <Switch
            text={getLang(
                "Create a 1fps video if no transition is selected. This should speed up the conversion, but you won't be able to put decimal values in the image length.",
            )}
            onchange={enabled => {
                ConversionOptions.imageToVideo.force1FpsVideo = enabled;
            }}
            checked={ConversionOptions.imageToVideo.force1FpsVideo}
        ></Switch>
    </Card><br />
    <Card type={1}>
        <div class="flex hcenter" style="gap: 8px">
            <AdaptiveAsset asset="imagestack"></AdaptiveAsset>
            <h3>{getLang("Image position")}:</h3>
        </div>
        <Switch text={getLang("Use the maximum width and height of the images.")} onchange={enabled=> {
            ConversionOptions.imageToVideo.autoWidth = enabled;
        }} checked={ConversionOptions.imageToVideo.autoWidth}></Switch>
        {#if !ConversionOptions.imageToVideo.autoWidth}
            <br>
            <Card>
                <label class="flex hcenter" style="gap: 10px">
                    {getLang("Output width")}: <input type="number" bind:value={ConversionOptions.imageToVideo.width}>
                </label><br>
                <label class="flex hcenter" style="gap: 10px">
                    {getLang("Output height")}: <input type="number" bind:value={ConversionOptions.imageToVideo.height}>
                </label>
            </Card>
        {/if}<br>
        <Switch text={getLang("Scale images if they have a different aspect ratio. If disabled, black bars will be added to preserve the image.")} onchange={enabled=> {
            ConversionOptions.imageToVideo.shouldFill = enabled;
        }} checked={ConversionOptions.imageToVideo.shouldFill}></Switch>
    </Card>
    {#if Settings.hardwareAcceleration.type !== "none"}
    <p>{getLang("Note that, if you've enabled hardware acceleration, the conversion might fail if you have selected non-standard aspect ratios")}</p>
    {/if}
</Card>
