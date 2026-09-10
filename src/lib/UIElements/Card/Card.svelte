<script lang="ts">
    import { fade, blur, slide } from "svelte/transition";
    
    
    
    interface Props {
        /**
     * The card type. If put to `1`, the `var(--row)` color will be used
     */
        type?: number;
        /**
     * Force the card to keep a specific color, even if the user has enabled card blur
     * This must be applied especially for card dialogs
     */
        forceColor?: boolean;
        /**
     * The delay to apply before showing the card
     */
        inDelay?: number;
        children?: import('svelte').Snippet;
    }

    let {
        type = 0,
        forceColor = false,
        inDelay = 0,
        children
    }: Props = $props();
</script>

<div
    in:slide={{ duration: 600, delay: inDelay }}
    out:slide={{ duration: 600 }}
    class={`card ${forceColor ? `card${type}Force` : "backdropCard"} card${type}`}
>
    {@render children?.()}
</div>
