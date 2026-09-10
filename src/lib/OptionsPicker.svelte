<script lang="ts">
    import type { ChipInterface } from "../interfaces/chip";
    import InputOptions from "../ts/TabOptions/InputOptions.svelte";
    import Settings from "../ts/TabOptions/Settings.svelte";
    import Chip from "./UIElements/ChipElements/Chip.svelte";
    import ChipContainer from "./UIElements/ChipElements/ChipContainer.svelte";
    
    interface Props {
        /**
     * The supported fields for this component.
     */
        arr: "input" | "hw";
    }

    let { arr }: Props = $props();
    /**
     * The text that has been written in the textbox
     */
    let writtenText = "";
    /**
     * Add the written item as an argument
     */
    function addItem() {
        if (arr === "input")
            InputOptions.val = [
                ...InputOptions.val,
                { id: crypto.randomUUID(), display: writtenText },
            ];
        else if (arr === "hw")
            InputOptions.val = [
                ...Settings.hardwareAcceleration.additionalProps,
                { id: crypto.randomUUID(), display: writtenText },
            ]
    }
</script>

<div class="flex" style="gap: 10px;">
    <input
        type="text"
        style="background-color: var(--row);"
        bind:value={writtenText}
        onkeydown={(e) => {
            if (e.key === "Tab") {
                // Setup "Tab" shortcut
                e.preventDefault();
                addItem();
            }
        }}
    />
    <button style="width: fit-content;" onclick={addItem}>Add</button>
</div>
<br />
<ChipContainer>
    <Chip
        selectionItems={arr === "input"
            ? InputOptions.val
            : Settings.hardwareAcceleration.additionalProps}
        isInputChip={true}
        onUserSelection={id => {
            const index = (
                arr === "input"
                    ? InputOptions.val
                    : Settings.hardwareAcceleration.additionalProps
            ).findIndex((e) => e.id === id);
            if (index !== -1) {
                (arr === "input"
                    ? InputOptions.val
                    : Settings.hardwareAcceleration.additionalProps
                ).splice(index, 1);
                if (arr === "input") InputOptions.val = InputOptions.val;
                else if (arr === "hw")
                    Settings.hardwareAcceleration.additionalProps =
                        Settings.hardwareAcceleration.additionalProps;
            }
        }}
    ></Chip>
</ChipContainer>
