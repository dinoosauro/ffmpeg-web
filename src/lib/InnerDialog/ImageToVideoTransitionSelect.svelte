<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->

<script lang="ts">
    import { getLang } from "../../ts/LanguageAdapt";
    let select: HTMLSelectElement;
    $effect(() => { // Save the first element of the specific transition Select as the selected one
        if (selectedKey !== "none" && selectedValue && select) select.dispatchEvent(new Event("change"));
    })

    let {editCallback, editKeyCallback, editDurationCallback, selectedKey = "none", selectedValue = "", currentDuration = 1}: {
        /**
         * Function called when the user changes the animation origin (top, bottom, left, right)
         * @param str the name of the animation origin
         */
        editCallback: (str: string) => void,
        /**
         * Function called when the user changes the animation to add to the dialog
         * @param str the name of the animation
         */ 
        editKeyCallback: (str: string) => void, 
        /**
         * Function called when the user changes the animation length
         * @param num the seconds of the animation
         */
        editDurationCallback: (num: number) => void,
        /**
        * The selected item in the main Select element
        */
        selectedKey: string,
        /**
         * The specific transition value that should be used for the `xfade` animation
         */
        selectedValue: string,
        /**
        * Transition duration
        */
        currentDuration: number
    } = $props();

    $effect(() => {
        editCallback(selectedValue);
    })
</script>
<select bind:value={selectedKey} onchange={(e) => {
    if (selectedKey === "none") editCallback("none");
    editKeyCallback(selectedKey);
}}>
    <option value="none">{getLang("None (recommended)")}</option>
    <option value="fade">Fade</option>
    <option value="wipe">Wipe</option>
    <option value="slide">Slide</option>
    <option value="smooth">Smooth</option>
    <option value="circle">Circle / Rectangle</option>
    <option value="horz">Horizontal</option>
    <option value="vert">Vertical</option>
    <option value="diag">Diag</option>
    <option value="slice">Slice</option>
    <option value="squeeze">Squeeze</option>
    <option value="wind">Wind</option>
    <option value="cover">Cover</option>
    <option value="reveal">Reveal</option>
    <option value="other">Other</option>
</select>

{#if selectedKey !== "none"}
    <br><br>
    <select bind:this={select} bind:value={selectedValue}>
        {#if selectedKey === "wipe" || selectedKey === "slide" || selectedKey === "smooth" || selectedKey === "cover" || selectedKey === "reveal"}
            <option value={`${selectedKey}left`}>Right to left</option>
            <option value={`${selectedKey}right`}>Left to right</option>
            <option value={`${selectedKey}up`}>Bottom to top</option>
            <option value={`${selectedKey}down`}>Top to bottom</option>
        {/if}
        {#if selectedKey === "fade"}
            <option value="fade">Standard fade</option>
            <option value="fadeblack">Fade with black in the middle</option>
            <option value="fadewhite">Fade with white in the middle</option>
            <option value="fadegrays">Fade with gray in the middle</option>
        {/if}
        {#if selectedKey === "circle"}
            <option value="circlecrop">Circle crop</option>
            <option value="rectcrop">Rectangle crop</option>
        {/if}
        {#if selectedKey === "circle" || selectedKey === "horz" || selectedKey === "vert"}
            <option value={`${selectedKey}close`}>Close</option>
            <option value={`${selectedKey}open`}>Open</option>
        {/if}
        {#if selectedKey === "diag"}
            <option value="diagbl">From the top-right corner</option>
            <option value="diagbr">From the top-left corner</option>
            <option value="diagtl">From the bottom-left corner</option>
            <option value="diagtr">From the bottom-right corner</option>
        {/if}
        {#if selectedKey === "slice"}
            <option value="hlslice">From right to left</option>
            <option value="hrslice">From left to right</option>
            <option value="vuslice">From bottom to top</option>
            <option value="vdslice">From top to bottom</option>
        {/if}
        {#if selectedKey === "squeeze"}
            <option value="squeezev">Vertical squeeze</option>
            <option value="squeezeh">Horizontal squeeze</option>
        {/if}
        {#if selectedKey === "wind"}
            <option value="hlwind">From right to left</option>
            <option value="hrwind">From left to right</option>
            <option value="vuwind">From bottom to top</option>
            <option value="vswind">From top to bottom</option>
        {/if}
        {#if selectedKey === "other"}
            <option value="distance">Distance</option>
            <option value="dissolve">Dissolve</option>
            <option value="pixelize">Pixelize</option>
            <option value="radial">Radial</option>
            <option value="hblur">Blur</option>
        {/if}
    </select>
    {#if selectedValue !== ""} 
        <br><br>
        <a href={`https://trac.ffmpeg.org/wiki/Xfade#:~:text=${selectedValue}`} target="_blank">{getLang("View example")}</a><br><br>
        <label class="flex hcenter" style="gap: 10px">
            {getLang("Transition duration (in seconds)")}: <input type="number" bind:value={currentDuration} onchange={(e) => {
                editDurationCallback(currentDuration);
            }}>
        </label>
    {/if}
{/if}

<style>
    select, input {
        background-color: var(--row) !important;
    }
</style>