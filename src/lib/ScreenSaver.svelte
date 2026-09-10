<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import BackgroundManager from "../ts/Customization/BackgroundType";
    import { fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import Writables from "../ts/Writables.svelte";
    import Card from "./UIElements/Card/Card.svelte";
    import Settings from "../ts/TabOptions/Settings.svelte";
    import FullscreenManager from "../ts/FullscreenManager";
    import { getLang } from "../ts/LanguageAdapt";
    import type { FFmpegEvent, FfmpegEventDetails } from "../interfaces/ffmpeg";
    import ConsoleEvents from "../ts/FFmpegUtils/ConsoleEvents";
    /**
     * The div where the Screensaver will be contained
     */
    let backgroundContainer: HTMLDivElement;
    /**
     * The function that will get the updates from the FFmpeg object
     * @param value the FFmpegEvent
     */
    function updateProgressItems(value: FfmpegEventDetails) {
        if (value.operation === currentConversion) {
            if (!isNaN(value.progress))
                progress.value = value.progress;
            text.textContent = value.str;
        }
    }
    onMount(() => {
        const theme = new BackgroundManager(backgroundContainer); // Get the background content for the screensaver
        theme.apply(true);
        if (Settings.screenSaver.options.showConversionStatus) {
            // The user wants to see the conversion status
            ConsoleEvents.registerConsoleEvent(updateProgressItems);
        }
        const interval = setInterval(async () => {
            if (!optionContainer) {
                clearInterval(interval);
                return;
            }
            optionContainer.style.opacity = "0";
            await new Promise((resolve) => setTimeout(resolve, 390));
            for (const option of ["topMovement", "bottomMovement"])
                optionContainer.classList.toggle(option); // Switch from top to bottom and viceversa
            optionContainer.style.opacity = "1";
        }, Settings.screenSaver.options.moveContent);
        Settings.screenSaver.options.fullscreen && FullscreenManager.apply(backgroundContainer);
        const etaInterval = setInterval(() => {
            if (!startedOnParagraph) return;
            startedOnParagraph.textContent = `${getLang("Started at")}: ${new Date(Writables.conversionFileDone.startDate[currentConversion]).toLocaleTimeString()} – ${getLang("Estimated time")}: ${new Date((Date.now() - Writables.conversionFileDone.startDate[currentConversion]) / progress.value).toLocaleTimeString(undefined, {timeZone: "UTC"})}`;
        }, 500);
        return () => {
            // Remove the event listener to avoid unnecessary calls (and errors)
            ConsoleEvents.deleteConsoleEvent(updateProgressItems);
            clearInterval(etaInterval);
        }
    });
    interface Props {
        currentConversion?: number;
    }

    let { currentConversion = 0 }: Props = $props();
    /**
     * The HTMLProgress element for the current conversion progress
     */
    let progress: HTMLProgressElement;
    /**
     * The paragraph in which the last console string will be copied.
     */
    let text: HTMLParagraphElement;
    let optionContainer: HTMLDivElement;

    /**
     * The paragraph where the starting time and the estimate is written
     */
    let startedOnParagraph: HTMLElement;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
    bind:this={backgroundContainer}
    in:fade={{ duration: 400, easing: cubicInOut }}
    onclick={() => (Writables.screensaverInfo.enabled = false)}
    out:fade={{ duration: 400, easing: cubicInOut }}
    class="screenSaver"
>
    <div
        style="padding: 25px; margin-top: 10px; position: absolute; transition: opacity 0.4s ease-in-out"
        class="topMovement fullWidth"
        bind:this={optionContainer}
    >
        {#if Settings.screenSaver.options.showConversionName}
            <div class="screenContainer floatLeft">
                {#if Writables.conversionFileDone.currentFile[currentConversion] === 0}
                    <h1>{getLang("No conversion started")}</h1>
                {:else if Writables.conversionFileDone.currentFile[currentConversion] === -1}
                    <h1>
                        {getLang("The selected conversion (Conversion")}
                        {currentConversion + 1})
                        {getLang("has ended!")}
                    </h1>
                {:else}
                    <h1>{getLang("Converting file:")}</h1>
                    <h2>«{Writables.conversionFileDone.fileNames[currentConversion]}»</h2>
                    <progress
                        value={Writables.conversionFileDone.currentFile[currentConversion] - 1}
                        max={Writables.conversionFileDone.maxFiles[currentConversion]}
                    ></progress>
                {/if}
            </div>
        {/if}
        {#if Settings.screenSaver.options.showConversionStatus}
            <div
                class="screenContainer floatRight"
                style="float: right; width: 45%"
            >
                <Card>
                    <progress
                        style="background-color: var(--row);"
                        bind:this={progress}
                        max={1}
                    ></progress><br />
                    {#if Settings.screenSaver.options.showEstimate}
                        <p style="text-align: center;" bind:this={startedOnParagraph}></p>
                    {:else}
                    <br>
                    {/if}
                    <Card type={1}>
                        <p bind:this={text}>
                            {getLang("Conversion text will appear here")}
                        </p>
                    </Card>
                </Card>
            </div>
        {/if}
    </div>
</div>

<style>
    .screenSaver {
        position: fixed;
        z-index: 2;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: var(--background);
        cursor: none;
    }
    h1 {
        font-size: clamp(28px, 7vw, 3em);
        margin: 0px;
    }
    h2 {
        font-size: clamp(18px, 5vw, 2.4em);
        word-break: break-all;
    }
    .screenContainer {
        max-width: calc(45% - 25px);
    }
    .floatLeft {
        float: left;
    }
    .floatRight {
        float: right;
        width: 45%;
    }
    @media (max-width: 800px) {
        .screenContainer {
            max-width: 100%;
        }
        .floatLeft {
            width: 100% !important;
        }
        .floatRight {
            float: left;
            width: 100% !important;
            margin-top: 20px;
        }
    }
</style>
