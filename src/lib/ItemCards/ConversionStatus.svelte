<script lang="ts">
    import { onMount } from "svelte";
    import Writables from "../../ts/Writables.svelte";
    import Card from "../UIElements/Card/Card.svelte";
    import ScreenSaver from "../ScreenSaver.svelte";
    import { getLang } from "../../ts/LanguageAdapt";
    import AdaptiveAsset from "../UIElements/AdaptiveAsset.svelte";
    import type { FFmpegEvent, FfmpegEventDetails } from "../../interfaces/ffmpeg";
    import ConsoleEvents from "../../ts/FFmpegUtils/ConsoleEvents";
    /**
     * The progress bar
     */
    let progress: HTMLProgressElement;
    /**
     * The Select where the user can choose which conversion to follow
     */
    let selectedOption = $state(0);
    /**
     * Create a new paragraph with the console output
     * @param add the string to add
     */
    function newText(add: string) {
        let p = document.createElement("p");
        p.textContent = add;
        p.classList.add("smallHeight");
        document.getElementById("addContent")?.append(p);
        (document.getElementById("addContent") as HTMLElement).children.length >
            2000 && document.getElementById("addContent")?.firstChild?.remove(); // Avoid keeping too many paragraphs
    }
    onMount(() => {
        // Update the UI when there's something new in the console
        ConsoleEvents.registerConsoleEvent((value: FfmpegEventDetails) => {
            if (selectedOption === value.operation) {
                newText(value.str);
                if (!isNaN(value.progress)) {
                    progress.value = value.progress;
                }
            }
        });

        setInterval(() => {
            if (!startedOnParagraph) return;
            startedOnParagraph.textContent = `${getLang("Started at")}: ${new Date(Writables.conversionFileDone.startDate[selectedOption]).toLocaleTimeString()} – ${getLang("Estimated time")}: ${new Date((Date.now() - Writables.conversionFileDone.startDate[selectedOption]) / progress.value).toLocaleTimeString(undefined, {timeZone: "UTC"})}`;
        }, 500);
    });

    /**
     * The paragraph where the starting time and the estimate is written
     */
    let startedOnParagraph: HTMLElement;

    $effect(() => {
        document.title =
            Writables.conversionFileDone.currentFile[selectedOption] > 0
                ? `[${Writables.conversionFileDone.currentFile[selectedOption]}/${Writables.conversionFileDone.maxFiles[selectedOption]}] | ffmpeg-web | ${getLang("Converting file")} ${Writables.conversionFileDone.fileNames[selectedOption]}`
                : `ffmpeg-web`;
    })
    /**
     * Switch from a conversion to another, showing the last lines of text
     */
    function selectChange() {
        if (!document.getElementById("addContent")) return;
        (document.getElementById("addContent") as HTMLElement).innerHTML = "";
        for (let item of Writables.conversionText[selectedOption]) newText(item);
        progress.value = Writables.conversionProgress[selectedOption];
    }


</script>

<Card>
    <div class="flex hcenter wcenter" style="gap: 10px">
        <AdaptiveAsset asset="streamoutput"></AdaptiveAsset>
        <h2>{getLang("Conversion status:")}</h2>
    </div>
    <select style="background-color: var(--row);" onchange={selectChange} bind:value={selectedOption}>
        {#each new Array(Writables.currentConversionValue).fill(0).map((a, i) => i) as i}
            <option value={i}>{getLang("Operation")} {i + 1}</option>
        {/each}
    </select><br />
    <p style="text-align: center;">
    {Writables.conversionFileDone.currentFile[selectedOption] > 0 ? `${getLang("Converting file")} ${Writables.conversionFileDone.currentFile[selectedOption]} ${getLang("of")} ${Writables.conversionFileDone.maxFiles[selectedOption]}` : getLang("All the files have been converted")}
    </p>
    <Card type={1}>
        <progress max={1} bind:this={progress}></progress><br />
        {#if Writables.conversionFileDone.currentFile[selectedOption] > 0}
            <p style="text-align: center;" bind:this={startedOnParagraph}></p>
        {:else}
        <br>
        {/if}
        <Card>
            <div style="overflow: auto; max-height: 30vh" id="addContent">
                <p>{getLang("You'll see here all the logs made by ffmpeg.")}</p>
            </div>
        </Card>
    </Card>
</Card>

{#if Writables.screensaverInfo.enabled}
    <ScreenSaver currentConversion={selectedOption}></ScreenSaver>
{/if}
