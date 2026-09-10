<script lang="ts">
    import { getLang } from "../../../ts/LanguageAdapt";
    import ConversionOptions from "../../../ts/TabOptions/ConversionOptions.svelte";
    import AdaptiveAsset from "../../UIElements/AdaptiveAsset.svelte";
    import Card from "../../UIElements/Card/Card.svelte";
    import MediaEncoding from "./MediaEncoding.svelte";
    import { slide } from "svelte/transition";
    interface Props {
        showExtraDialog: () => void;
    }

    let { showExtraDialog }: Props = $props();
</script>

<div class="flex hcenter wcenter" style="gap: 10px">
    <AdaptiveAsset asset="audionote2play"></AdaptiveAsset>
    <h2>{getLang("Music to video:")}</h2>
</div>
<p>
    {getLang(
        "Select the audio files. We'll use ffmpeg to fetch the album art and the metadata, and we'll create some images with them.",
    )}
</p>
<br />
<label class="flex hcenter" style="gap: 10px">
    {getLang("Output container (extension):")}
    <input type="text" bind:value={ConversionOptions.audioToVideo.extension} />
</label><br />
<Card type={1}>
    <h3>{getLang("Output codecs:")}</h3>
    <p>
        {getLang(
            "It might be a good idea keeping the original audio and video file, but you can still choose the output codec, and its bitrate",
        )}
    </p>
    <div in:slide={{ duration: 600, delay: 600 }} out:slide={{ duration: 600 }}>
        <Card>
            <MediaEncoding enabledCardCallback={() => {}} isMinimal={true}></MediaEncoding><br />
            <label class="flex hcenter" style="gap: 10px">
                {getLang("Video bitrate:")}
                <input
                    type="text"
                    bind:value={ConversionOptions.audioToVideo.videoBitrate}
                />
            </label><br />
            <label class="flex hcenter" style="gap: 10px">
                {getLang("Audio bitrate:")}
                <input
                    type="text"
                    bind:value={ConversionOptions.audioToVideo.audioBitrate}
                />
            </label><br />
        </Card>
    </div>
    <br />
    <button onclick={(e) => {
        document.body.style.setProperty("--positionX", `${e.clientX}px`);
        document.body.style.setProperty("--positionY", `${e.clientY}px`);
        showExtraDialog();
    }}
        >{getLang("Show advanced settings")}</button
    >
</Card>

<style>
    input:not([type=checkbox]) {
        background-color: var(--row) !important;
    }
</style>