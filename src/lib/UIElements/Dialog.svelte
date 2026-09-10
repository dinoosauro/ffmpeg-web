<script lang="ts">
    import { onDestroy } from "svelte";
    import { getLang } from "../../ts/LanguageAdapt";
    import Writables from "../../ts/Writables.svelte";   

    
    interface Props {
        /**
     * Move the "Close dialog" button at the top of the UI
     */
        closeAtTop?: boolean;
        /**
     * The function that will be called for closing them
     */
        closeFunction?: any;
        children?: import('svelte').Snippet;
    }

    let { closeAtTop = false, closeFunction = () => {}, children }: Props = $props();
    /**
     * The dialog container
     */
    let dialog: HTMLElement;
    $effect(() => {
        Writables.currentlyPressedKeys.indexOf("escape") !== -1 && closeAnimation();
    })
    async function closeAnimation() {
        dialog.classList.remove("simpleAnimate");
        await new Promise((resolve) => setTimeout(resolve, 15));
        dialog.classList.add("animateReverse");
        setTimeout(() => {
            // Another fix for WebKit: opacity is set to 0 since otherwise the dialog would be visible for a frame
            dialog.style.opacity = "0";
        }, 525);
        await new Promise((resolve) => setTimeout(resolve, 550));
        closeFunction();
    }
</script>

<div class="dialog simpleAnimate" bind:this={dialog}>
    <div>
        <div>
            {#if closeAtTop}
                <button onclick={closeAnimation}
                    >{getLang("Close dialog")}</button
                ><br /><br />
            {/if}
            {@render children?.()}
            {#if !closeAtTop}
                <br /><br /><button onclick={closeAnimation}
                    >{getLang("Close dialog")}</button
                >
            {/if}
        </div>
    </div>
</div>
