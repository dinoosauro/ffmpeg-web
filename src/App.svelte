<script lang="ts">
    import CardAdapt from "./lib/UIElements/Card/CardAdapt.svelte";
    import Header from "./lib/Header.svelte";
    import MainPicker from "./lib/ItemCards/MainPicker.svelte";
    import VideoOutput from "./lib/ItemCards/VideoOutput.svelte";
    import AudioOutput from "./lib/ItemCards/AudioOutput.svelte";
    import FileHandler from "./lib/ItemCards/FileHandler.svelte";
    import ConversionOptions from "./ts/TabOptions/ConversionOptions.svelte";
    import ConversionStatus from "./lib/ItemCards/ConversionStatus.svelte";
    import CustomInput from "./lib/ItemCards/MainCards/CustomInput.svelte";
    import Writables from "./ts/Writables.svelte"
    import { onMount } from "svelte";
    import { scale, slide } from "svelte/transition";
    import Metadata from "./lib/ItemCards/Metadata.svelte";
    import { GetImage } from "./ts/ImageHandler";
    import Dialog from "./lib/UIElements/Dialog.svelte";
    import Card from "./lib/UIElements/Card/Card.svelte";
    import DialogAnimationStart from "./ts/DialogAnimationStart";
    import TopDialog from "./lib/UIElements/TopDialog.svelte";
    import Settings from "./ts/TabOptions/Settings.svelte";
    import ChipContainer from "./lib/UIElements/ChipElements/ChipContainer.svelte";
    import Chip from "./lib/UIElements/ChipElements/Chip.svelte";
    import SettingsDialog from "./lib/InnerDialog/SettingsDialog.svelte";
    import CustomizationHandler from "./ts/Customization/Themes";
    import BackgroundManager from "./ts/Customization/BackgroundType";
    let showVideo = $derived(ConversionOptions.isVideoSelected);
    let showAudio = $derived(ConversionOptions.isAudioSelected);
    import "./ts/Customization/Screensaver";
    import "./ts/Migration";
    import ScreenSaver from "./lib/ScreenSaver.svelte";
    import FullscreenManager from "./ts/FullscreenManager";
    import RedownloadFiles from "./lib/ItemCards/RedownloadFiles.svelte";
    import AdaptiveAsset from "./lib/UIElements/AdaptiveAsset.svelte";
    import { get } from "svelte/store";
    import UpdateDialog from "./lib/UpdateDialog.svelte";
    import { getLang } from "./ts/LanguageAdapt";
    import Installation from "./lib/ItemCards/Installation.svelte";
    import ImageToVideoFilters from "./lib/ItemCards/ImageToVideoFilters.svelte";
    import type { FFmpegEvent } from "./interfaces/ffmpeg";
    import InputOptions from "./ts/TabOptions/InputOptions.svelte"
    import MergeOptions from "./ts/TabOptions/MergeOptions.svelte"
    import MetadataOptions from "./ts/TabOptions/MetadataOptions.svelte"
    import ConsoleEvents from "./ts/FFmpegUtils/ConsoleEvents";
    onMount(() => {
        // @ts-ignore | Fallback for randomUUID in non-secure contexts. This isn't ideal, since crypto.randomUUID is way better than Math.random(), but, since it's only used for keeping track of Chip IDs, it's fine.
        if (crypto.randomUUID === undefined)
            crypto.randomUUID = () => Math.random().toString() as any;
        const item = JSON.parse(
            localStorage.getItem("ffmpegWeb-CurrentTheme") ?? "{}",
        );
        item.name && CustomizationHandler.applyTheme(item.name, item.isDefault);
        if (Settings.backgroundContent.type !== "color")
            new BackgroundManager(document.body).apply();
    });
    $effect(() => {
        if (Writables.currentlyPressedKeys.indexOf("meta") !== -1 && Writables.currentlyPressedKeys.indexOf("p") !== -1) showSettings = true;
    })
    let showSettings = $state(false);
    let wakeLock: WakeLockSentinel | undefined;
    window.addEventListener("beforeunload", (e) => { // Ask the user if they want to close ffmpeg-web if a conversion is running
        if (Writables.conversionFileDone.currentFile.some(i => i > 0)) {
            e.preventDefault();
            e.returnValue = "";
            return "";
        }
    })
    /**
     * An unique identifier used so that, if remote mode is enabled, multiple windows of ffmpeg-web will be divided
     */
    let uniqueIdForServer = crypto.randomUUID();
    ConsoleEvents.registerConsoleEvent(({str, progress, operation}) => {
        try {
            if (Settings.shareProgressUrl) fetch(`${Settings.shareProgressUrl}${Settings.shareProgressUrl.endsWith("/") ? "" : "/"}api/console?text=${encodeURIComponent(str)}&progress=${progress}&operation=${operation}&timestamp=${Date.now()}&id=${encodeURIComponent(uniqueIdForServer)}`);
        } catch(ex) {}
    })
    $effect(() => {
        try {
            if (Settings.shareProgressUrl) fetch(`${Settings.shareProgressUrl}${Settings.shareProgressUrl.endsWith("/") ? "" : "/"}api/conversion?currentPosition=${encodeURIComponent(JSON.stringify(Writables.conversionFileDone.currentFile))}&maxPosition=${encodeURIComponent(JSON.stringify(Writables.conversionFileDone.maxFiles))}&fileNames=${encodeURIComponent(JSON.stringify(Writables.conversionFileDone.fileNames))}&timestamp=${Date.now()}&id=${encodeURIComponent(uniqueIdForServer)}`);
        } catch(ex) {}
    })
    $effect(() => {
        for (const item of document.querySelectorAll("video"))
            item[Writables.screensaverInfo.enabled ? "pause" : "play"](); // Pause the previous videos if the screensaver is enabled
        document.body.style.overflow = Writables.screensaverInfo.enabled ? "hidden" : "auto";
        try {
            !Writables.screensaverInfo.enabled && FullscreenManager.remove();
            Writables.screensaverInfo.enabled
                ? navigator.wakeLock.request().then((res) => (wakeLock = res))
                : wakeLock?.release();
        } catch (ex) {
            console.warn(ex);
        }
    })
    /**
     * Check if a value is binary data
     * @param value the value to check
     */
    function isBinary(value: any) {
        return value instanceof ArrayBuffer || ArrayBuffer.isView(value) || (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) || (typeof Blob !== "undefined" && value instanceof Blob) || (typeof File !== "undefined" && value instanceof File);
    }
    $effect(() => { // Save elements to LocalStorage
        localStorage.setItem("ffmpegWeb-LastSettings", JSON.stringify(ConversionOptions, (key, value) => isBinary(value) ? undefined : value));
    })
    $effect(() => {
        localStorage.setItem("ffmpegWeb-LastGeneralSettings", JSON.stringify(Settings, (key, value) => isBinary(value) ? undefined : value));
    })
    $effect(() => {
        localStorage.setItem("ffmpegWeb-LastInputStorage", JSON.stringify(InputOptions, (key, value) => isBinary(value) ? undefined : value));
    })
    $effect(() => {
        localStorage.setItem("ffmpegWeb-LastMergeSettings", JSON.stringify(MergeOptions, (key, value) => isBinary(value) ? undefined : value));
    })
    $effect(() => {
        localStorage.setItem("ffmpegWeb-LastMetadataEditOptions", JSON.stringify(MetadataOptions, (key, value) => isBinary(value) ? undefined : value));
    })
</script>

<Header></Header><br />
<div>
    <CardAdapt>
        <MainPicker
            changedMainTabCallback={selectedItem => (Writables.applicationSection = selectedItem)}
            enabledCardCallback={({isVideo, result}) => isVideo ? (showVideo = result) : (showAudio = result)}
        ></MainPicker>
        {#if (showVideo && Writables.applicationSection === "MediaEnc") || Writables.applicationSection === "Image"}
            <VideoOutput></VideoOutput>
        {/if}
        {#if showAudio && Writables.applicationSection === "MediaEnc"}
            <AudioOutput></AudioOutput>
        {/if}
        {#if Writables.applicationSection === "ImageToVideo"}
            <ImageToVideoFilters></ImageToVideoFilters>
        {/if}
        {#if Writables.applicationSection === "Metadata"}
            <Metadata></Metadata>
        {/if}
        <FileHandler></FileHandler>
        <ConversionStatus></ConversionStatus>
        {#if Writables.changedFileSave}
            <RedownloadFiles></RedownloadFiles>
        {/if}
        {#if Writables.showInstallationCard}
            <Installation></Installation>
        {/if}
    </CardAdapt>
</div>
<div
    style="position: absolute; top: 15px; right: 15px"
    class="pointer"
    onclick={(e) => {
        DialogAnimationStart(e);
        showSettings = true;
    }}
>
    <AdaptiveAsset width={24} asset="settings"></AdaptiveAsset>
</div>

{#if showSettings}
    <Dialog closeFunction={() => (showSettings = false)}>
        <SettingsDialog closeFn={() => (showSettings = false)}
        ></SettingsDialog>
    </Dialog>
{/if}

{#if Writables.showOverwriteDialog && typeof window.nativeOperations !== "undefined"}
    <div>
        <TopDialog
            closeDialog={() => (Writables.showOverwriteDialog = undefined)}
            indefinite={true}
            dialogId="OverwriteFile"
        >
            <p>{getLang("Found existent file")}: {Writables.showOverwriteDialog}</p>
            <button
                style="text-decoration: underline; width: fit-content"
                onclick={() => {
                    window.nativeOperations.send("Overwrite");
                    Writables.showOverwriteDialog = undefined;
                }}
            >
                {getLang("Overwrite")}
            </button>
        </TopDialog>
    </div>
{/if}

{#if Writables.updateDialogShown}
    <UpdateDialog></UpdateDialog>
{/if}
