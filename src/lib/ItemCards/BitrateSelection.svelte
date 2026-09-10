<script lang="ts">
     import ConversionOptions from "../../ts/TabOptions/ConversionOptions.svelte";
    import { getLang } from "../../ts/LanguageAdapt";
    import Switch from "../UIElements/Switch.svelte";
    import Writables from "../../ts/Writables.svelte";
    import { slide } from "svelte/transition";
    import AdaptiveAsset from "../UIElements/AdaptiveAsset.svelte";
    import { onMount, onDestroy } from "svelte";
    import Settings from "../../ts/TabOptions/Settings.svelte";
    import Card from "../UIElements/Card/Card.svelte";
    
    
    interface Props {
        /**
     * The bitrate of this _type_ needs to be changed
     */
        type: "video" | "audio" | "image";
        /**
     * If the BitrateSelection component is embedded in another Card
     */
        embedded?: boolean;
    }

    let { type, embedded = false }: Props = $props();
    let showBufferSize = $state(false);
    if (type === "video") $effect(() => {
        showBufferSize = Writables.showBufSize;
        if (Settings.hardwareAcceleration.type === "vaapi") ConversionOptions.videoOptions.useSlider = true;
    })
</script>
<Card type={1}>

    {#if !embedded}
<div class="flex hcenter" style="gap: 8px">
    <AdaptiveAsset width={26} asset="sparkle"></AdaptiveAsset>
    <h3>{getLang("Choose bitrate:")}</h3>
</div>
{:else}
<br>
{/if}


{#if type !== "image" && (type !== "audio" || !Writables.audioBitrateSettings[0]) && (type !== "video" || Settings.hardwareAcceleration.type !== "vaapi")}
    <span in:slide={{ duration: 600 }} out:slide={{ duration: 600 }}>
        <Switch
            text={getLang("Choose with a slider")}
            onchange={enabled =>
                (ConversionOptions[`${type}Options`].useSlider = enabled)}
            checked={ConversionOptions[`${type}Options`].useSlider}
        ></Switch><br />
    </span>
{/if}
<label>
    <input
        type={ConversionOptions[`${type}Options`].useSlider ? "range" : "text"}
        bind:value={ConversionOptions[`${type}Options`].value}
        min={ConversionOptions[`${type}Options`].useSlider ? 1 : undefined}
        max={ConversionOptions[`${type}Options`].useSlider
            ? type === "video"
                ? 51
                : type === "image" && Writables.imageFormatSelected === "!1"
                  ? 31
                  : type === "image"
                    ? 100
                    : 9
            : undefined}
    />
</label>
{#if ConversionOptions[`${type}Options`].useSlider}
    <br />
    <i
        >{getLang("Closer to the left:")}
        {type === "image" && Writables.imageFormatSelected === "!1"
            ? getLang("higher quality")
            : type === "image"
              ? getLang("worse quality")
              : getLang("high bitrate")}</i
    >
    {#if showBufferSize && type === "video"}
        <br /><br />
        <label class="flex hcenter" style="gap: 10px"
            >Buffer size: <input
                type="text"
                bind:value={ConversionOptions.videoOptions.maxRate}
            /></label
        >
    {/if}
{/if}
</Card>