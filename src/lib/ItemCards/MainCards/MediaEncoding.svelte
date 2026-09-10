<script lang="ts">
    import { slide } from "svelte/transition";
    import ConversionOptions from "../../../ts/TabOptions/ConversionOptions.svelte";
    import Switch from "../../UIElements/Switch.svelte";
    import ChipContainer from "../../UIElements/ChipElements/ChipContainer.svelte";
    import Chip from "../../UIElements/ChipElements/Chip.svelte";
    import EncoderInfo from "../../../ts/TabOptions/EncoderInfo";
    import { getLang } from "../../../ts/LanguageAdapt";
    import Writables from "../../../ts/Writables.svelte";
    import { GetImage } from "../../../ts/ImageHandler";
    import AdaptiveAsset from "../../UIElements/AdaptiveAsset.svelte";
    import Card from "../../UIElements/Card/Card.svelte";
    
    interface Props {
        /**
     * If only the selection should be displayed, without the title
     */
        isMinimal?: boolean;
        showOnlyVideo?: boolean;
        /**
         * Function called when the user has enabled or disable video or audio encoding
         */
        enabledCardCallback?: ({isVideo, result}: {isVideo: boolean, result: boolean}) => void
    }

    let { isMinimal = false, showOnlyVideo = false, enabledCardCallback }: Props = $props();
</script>

<div in:slide={{ duration: 600, delay: 600 }} out:slide={{ duration: 600 }}>
    {#if !isMinimal}
        <div class="flex hcenter wcenter" style="gap: 10px">
            <AdaptiveAsset asset="convertrange"></AdaptiveAsset>
            <h2>{getLang("Conversion options:")}</h2>
        </div>
        <p>
            {getLang(
                "You can choose between lots of formats. Click on the switch to select what media type(s) you want in your final file:",
            )}
        </p>
        <Switch
            onchange={enabled => {
                ConversionOptions.isVideoSelected = enabled;
                enabledCardCallback && enabledCardCallback({ isVideo: true, result: enabled });
            }}
            checked={ConversionOptions.isVideoSelected}
            text={getLang("Enable video source")}
        ></Switch><br />
    {:else}
        <h4 style="margin-top: 10px">{getLang("Video codec")}:</h4>
    {/if}
</div>
{#if ConversionOptions.isVideoSelected || isMinimal}
    <span in:slide={{ duration: 600 }} out:slide={{ duration: 600 }}>
        <ChipContainer type={1}>
            <Chip
                onUserSelection={id => {
                    ConversionOptions.videoTypeSelected = id;
                }}
                selectionItems={Array.from(EncoderInfo.video).map((item) => {
                    return {
                        id: item[0],
                        display: `${item[1].displayName}${item[1].extension !== "!" ? ` (.${item[1].extension})` : ""}`,
                        selected:
                            item[0] === ConversionOptions.videoTypeSelected,
                    };
                })}
            ></Chip>
        </ChipContainer>
        <br />
    </span>
{/if}
{#if !isMinimal}
    <Switch
        onchange={enabled => {
            ConversionOptions.isAudioSelected = enabled;
            enabledCardCallback && enabledCardCallback({ isVideo: false, result: enabled });
        }}
        checked={ConversionOptions.isAudioSelected}
        text={getLang("Enable audio source")}
    ></Switch><br>
{:else if !showOnlyVideo}
    <h4 style="margin-top: 0px">{getLang("Audio codec")}:</h4>
{/if}
{#if (ConversionOptions.isAudioSelected || isMinimal) && !showOnlyVideo}
    <span in:slide={{ duration: 600 }} out:slide={{ duration: 600 }}>
        <ChipContainer>
            <Chip
                onUserSelection={id => {
                    ConversionOptions.audioTypeSelected = id;
                    if (id === "libopus") {
                        ConversionOptions.audioOptions.useSlider = false;
                        Writables.audioBitrateSettings = [true, false];
                    } else if (EncoderInfo.audio.get(id)?.isLossless)
                        Writables.audioBitrateSettings = [false, true];
                    else Writables.audioBitrateSettings = [false, false];
                }}
                selectionItems={Array.from(EncoderInfo.audio).map((item) => {
                    return {
                        id: item[0],
                        display: `${item[1].displayName}${item[1].extension !== "!" ? ` (.${item[1].extension})` : ""}`,
                        selected:
                            item[0] === ConversionOptions.audioTypeSelected,
                    };
                })}
            ></Chip>
        </ChipContainer>
    </span>
{/if}
{#if !isMinimal}
<br>
        <Switch
        onchange={enabled => {
            ConversionOptions.outputContainerChanged = enabled;
        }}
        checked={ConversionOptions.outputContainerChanged}
        text={getLang("Custom output container")}
    ></Switch>
    {#if ConversionOptions.outputContainerChanged}
    <br>
        <span in:slide={{ duration: 600 }} out:slide={{ duration: 600 }}>
            <Card type={1}>
                <div class="flex hcenter" style="gap: 10px">
                    {getLang("File extension:")}
                    <input type="text" bind:value={ConversionOptions.outputContainerRequested}>
                </div>
            </Card>
    </span>
    {/if}
{/if}
