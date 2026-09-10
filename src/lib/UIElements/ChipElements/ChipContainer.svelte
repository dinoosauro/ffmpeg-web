<script lang="ts">
    import Card from "../Card/Card.svelte";
    interface Props {
        type?: number;
        children?: import('svelte').Snippet;
    }

    let { type = 1, children }: Props = $props();
</script>

<!--The container for the Chip elements, that permits to have them all on a single row-->
<Card {type}>
    <div class={`flex chipContainer${type === 0 ? " autoChip" : ""}`}>
        {@render children?.()}
    </div>
</Card>

<style>
    .chipContainer {
        overflow: auto;
        gap: 5px;
        padding-bottom: 10px;
    }
</style>

{#if type === 0}
<style>
    .autoChip > .chip {
        background-color: var(--row);
    }
</style>
{/if}