<script lang="ts">
    import { onMount } from "svelte";
    import {
        conversionFileDone,
        conversionProgress,
        conversionText,
        currentConversionValue,
        fileUrls,
        showScreensaver,
    } from "../../ts/Writables";
    import Card from "../UIElements/Card/Card.svelte";
    import ScreenSaver from "../ScreenSaver.svelte";
    import { getLang } from "../../ts/LanguageAdapt";
    import { GetImage } from "../../ts/ImageHandler";
    import AdaptiveAsset from "../UIElements/AdaptiveAsset.svelte";
    import type { FFmpegEvent } from "../../interfaces/ffmpeg";
    import { get } from "svelte/store";
    /**
     * The progress bar
     */
    let progress: HTMLProgressElement;
    /**
     * The Select where the user can choose which conversion to follow
     */
    let optionSelect: HTMLSelectElement;
    /**
     * Add the operation _val_ option to the main Select
     * @param val the maximum number to add in the select
     */
    function addItemsToSelect(val: number) {
        if (!optionSelect) return;
        optionSelect.innerHTML = "";
        for (let i = 0; i < val; i++) {
            const option = document.createElement("option");
            option.value = i.toString();
            option.textContent = `${getLang("Operation")} ${i + 1}`;
            optionSelect.append(option);
        }
        selectChange();
    }
    currentConversionValue.subscribe(addItemsToSelect); // When a new conversion is created, update the Select possibilities.
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
    /**
     * If the updateTitle event has already been fired. This is kept track so that the "Converting file" label isn't updated with the placeholder conversion options
     */
    let firstCallback = true;
    function updateTitle(update: [number, number, string][]) {
        document.title =
            update[+optionSelect.value][0] > 0
                ? `[${update[+optionSelect.value][0]}/${update[+optionSelect.value][1]}] | ffmpeg-web | ${getLang("Converting file")} ${update[+optionSelect.value][2]}`
                : `ffmpeg-web`;
        if (update[+optionSelect.value] && !firstCallback) {        
            convertText.textContent = update[+optionSelect.value][0] > 0 ? `${getLang("Converting file")} ${update[+optionSelect.value][0]} ${getLang("of")} ${update[+optionSelect.value][1]}` : getLang("All the files have been converted");
        }
        firstCallback = false;
    }

    onMount(() => {
        // @ts-ignore – Update the UI when there's something new in the console
        document.addEventListener("consoleUpdate", (value: FFmpegEvent) => {
            if (+optionSelect.value === value.detail.operation) {
                newText(value.detail.str);
                if (!isNaN(value.detail.progress))
                    progress.value = value.detail.progress;
            }
        });
        conversionFileDone.subscribe((update) => {
            updateTitle(update);
        });
    });
    /**
     * Switch from a conversion to another, showing the last lines of text
     */
    function selectChange() {
        if (!document.getElementById("addContent")) return;
        (document.getElementById("addContent") as HTMLElement).innerHTML = "";
        for (let item of conversionText[+optionSelect.value]) newText(item);
        progress.value = conversionProgress[+optionSelect.value];
        updateTitle(get(conversionFileDone));
    }
    /**
     * The `Converting file *x* of *y*` paragraph
     */
    let convertText: HTMLElement; 
</script>

<Card>
    <div class="flex hcenter wcenter" style="gap: 10px">
        <AdaptiveAsset asset="streamoutput"></AdaptiveAsset>
        <h2>{getLang("Conversion status:")}</h2>
    </div>
    <select
        style="background-color: var(--row);"
        on:change={selectChange}
        bind:this={optionSelect}
    >
    </select><br />
    <p style="text-align: center;" bind:this={convertText}>{getLang("No conversion has been started yet")}.</p>
    <Card type={1}>
        <progress max={1} bind:this={progress}></progress><br /><br />
        <Card>
            <div style="overflow: auto; max-height: 30vh" id="addContent">
                <p>{getLang("You'll see here all the logs made by ffmpeg.")}</p>
            </div>
        </Card>
    </Card>
</Card>

{#if $showScreensaver}
    <ScreenSaver currentConversion={+optionSelect.value}></ScreenSaver>
{/if}
