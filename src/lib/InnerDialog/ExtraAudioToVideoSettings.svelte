<script lang="ts">
    import { getLang } from "../../ts/LanguageAdapt";
    import ConversionOptions from "../../ts/TabOptions/ConversionOptions.svelte";
    import Writables from "../../ts/Writables.svelte"
    import AudioToVideo from "../ItemCards/MainCards/AudioToVideo.svelte";

    import AdaptiveAsset from "../UIElements/AdaptiveAsset.svelte";
    import Card from "../UIElements/Card/Card.svelte";
    import Dialog from "../UIElements/Dialog.svelte";
    import Switch from "../UIElements/Switch.svelte";
    interface Props {
        closeFunction: () => void;
    }

    let { closeFunction }: Props = $props();
</script>

<Dialog {closeFunction}>
    <div class="flex hcenter wcenter" style="gap: 10px">
        <AdaptiveAsset asset="videoclip"></AdaptiveAsset>
        <h2>{getLang("Customize the output of the video:")}</h2>
    </div>
    <Card type={1} forceColor={true}>
        <div class="flex hcenter" style="gap: 8px">
            <AdaptiveAsset asset="videoclipmultiple" width={26}></AdaptiveAsset>
            <h3>{getLang("Video customization:")}</h3>
        </div>

        <label class="flex hcenter" style="gap: 10px;"
            >{getLang("Font")}:
            <input
                type="text"
                bind:value={ConversionOptions.audioToVideo.font}
            /></label
        ><br />
        <label class="flex hcenter" style="gap: 5px;"
            >{getLang("FPS (-1 for variable)")}:
            <input
                type="number"
                min="-1"
                bind:value={ConversionOptions.audioToVideo.fps}
            /></label
        ><br />
        <Switch
            checked={Writables.albumToVideoBackground.img !== undefined}
            text={getLang("Use a custom background image")}
            onchange={enabled => {
                if (enabled) {
                    const input = Object.assign(
                        document.createElement("input"),
                        {
                            type: "file",
                            accept: "image/*",
                            onchange: () => {
                                if (input.files) {
                                    const image = new Image();
                                    image.onload = () => {
                                        Writables.albumToVideoBackground.img = image;
                                    };
                                    image.src = URL.createObjectURL(
                                        input.files[0],
                                    );
                                }
                            },
                        },
                    );
                    input.click();
                    return;
                }
                Writables.albumToVideoBackground.img = undefined;
            }}
        ></Switch><br />
        <Switch text={getLang("Embed the album art also to the output video")} checked={ConversionOptions.audioToVideo.addAlbumArtToOutput} onchange={enabled => {
            ConversionOptions.audioToVideo.addAlbumArtToOutput = enabled;
        }}></Switch><br>
        <label class="flex hcenter" style="gap: 10px">
            {getLang("Scale")}:
            <input
                type="number"
                bind:value={ConversionOptions.audioToVideo.scale}
            />
        </label>
    </Card><br />
    <Card type={1} forceColor={true}>
        <div class="flex hcenter" style="gap: 8px">
            <AdaptiveAsset asset="imagemultiple" width={26}></AdaptiveAsset>
            <h3>{getLang("Video content:")}</h3>
        </div>
        <Switch
            text={getLang("Show album art")}
            checked={ConversionOptions.audioToVideo.content.showAlbumArt}
            onchange={enabled => {
                ConversionOptions.audioToVideo.content.showAlbumArt = enabled;
            }}
        ></Switch><br />
        <Switch
            text={getLang("Show essential metadata information")}
            onchange={enabled => {
                ConversionOptions.audioToVideo.content.showQuickInfo = enabled;
            }}
            checked={ConversionOptions.audioToVideo.content.showQuickInfo}
        ></Switch><br />
        <Switch
            text={getLang("Show all metadata information")}
            onchange={enabled => {
                ConversionOptions.audioToVideo.content.showMetadataRecap =
                    enabled;
            }}
            checked={ConversionOptions.audioToVideo.content.showMetadataRecap}
        ></Switch><br />
        <Switch
            text={getLang("Show the selected custom background image")}
            onchange={enabled => {
                ConversionOptions.audioToVideo.content.showImportedImage =
                    enabled;
            }}
            checked={ConversionOptions.audioToVideo.content.showImportedImage}
        ></Switch><br />
    </Card><br />
    <Card type={1} forceColor={true}>
        <div class="flex hcenter" style="gap: 8px">
            <AdaptiveAsset asset="videoclipwand" width={26}></AdaptiveAsset>
            <h3>{getLang("Troubleshooting:")}</h3>
        </div>
        <Switch
            text={getLang("Save temporary images on device")}
            onchange={enabled => {
                ConversionOptions.audioToVideo.saveTemp = enabled;
            }}
            checked={ConversionOptions.audioToVideo.saveTemp}
        ></Switch><br />
        <Switch
            text={getLang(
                "Disable 0.11.x only for this section (it might be unstable)",
            )}
            onchange={enabled => {
                ConversionOptions.audioToVideo.disable011 = enabled;
            }}
            checked={ConversionOptions.audioToVideo.disable011}
        ></Switch><br />
                <Switch
            text={getLang(
                "Use single-threaded version of FFmpeg WebAssembly if available (only for this section)",
            )}
            onchange={enabled => {
                ConversionOptions.audioToVideo.useSingleThreadedIfAvailable = enabled;
            }}
            checked={ConversionOptions.audioToVideo.useSingleThreadedIfAvailable}
        ></Switch><br />
        <Switch
            text={getLang(
                "Get loop from audio duration. Disable it if you're having issues with the length of the file.",
            )}
            onchange={enabled => {
                ConversionOptions.audioToVideo.useDuration = enabled;
            }}
            checked={ConversionOptions.audioToVideo.useDuration}
        ></Switch><br />
        <Switch
            text={getLang(
                "Set `max_interleave_delta` to 0. This *might* help fixing wrong timestamps in Matroska files.",
            )}
            onchange={enabled => {
                ConversionOptions.audioToVideo.useInterleaveDelta = enabled;
            }}
            checked={ConversionOptions.audioToVideo.useInterleaveDelta}
        ></Switch><br />
        <Switch
            text={getLang(
                "Restore presentation timestamps to START. This *might* help fixing wrong timestamps.",
            )}
            onchange={enabled => {
                ConversionOptions.audioToVideo.restorePTS = enabled;
            }}
            checked={ConversionOptions.audioToVideo.restorePTS}
        ></Switch><br />
        <Switch text={getLang("If the output file is an MP4 video, add also non-standard metadata")} onchange={enabled => {ConversionOptions.audioToVideo.addNonStandardMp4Tags = enabled}} checked={ConversionOptions.audioToVideo.addNonStandardMp4Tags}></Switch><br>
    </Card>
</Dialog>
