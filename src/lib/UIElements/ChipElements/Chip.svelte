<script lang="ts">
    import type { ChipInterface } from "../../../interfaces/chip";
    
    
    /**
     * Change the item that is marked as selected
     * @param e the Click event
     */
    function changeSelected(e: Event) {
        const target = e.target as HTMLElement;
        target.parentElement
            ?.querySelector(".selected")
            ?.classList?.remove("selected");
        target.classList.add("selected");
        return true;
    }
    interface Props {
        /**
     * An array of the chips to show, with their:
     * @param `id` their ID
     * @param `display`: the string that'll be shown
     * @param `selected`: if they are selected or not
     */
        selectionItems: ChipInterface[];
        /**
     * If the chip items shouldn't be selected. This is called `isInputChip` since originally it was used only to save of custom input arguments
     */
        isInputChip?: boolean;
        useRowColor?: boolean;
        /**
         * Function called when the user changes the selected element
         * @param id the id selected by the user
         */
        onUserSelection: (id: string) => void
    }

    let { selectionItems, isInputChip = false, useRowColor = false, onUserSelection }: Props = $props();
</script>

{#each selectionItems as { display, id, selected } (id)}
    <!-- svelte-ignore a11y_interactive_supports_focus -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
        role="button"
        class={`chip${selected || isInputChip ? " selected" : ""}${isInputChip ? " chipInput" : ""}`}
        style={useRowColor ? "background-color: var(--row)" : undefined}
        onclick={(e) =>
            (!isInputChip ? changeSelected(e) : true) &&
            onUserSelection(id)}
    >
        {display}
    </div>
{/each}

<style>
    .chip {
        appearance: none;
        background-color: var(--card);
        border-radius: 12px;
        padding: 5px 15px;
        flex-wrap: nowrap;
        flex-shrink: 0;
        height: 30px;
        text-align: center;
        line-height: 30px;
        transition: background-color 0.2s ease-in-out;
    }
    .chip:hover {
        cursor: pointer;
    }
</style>
