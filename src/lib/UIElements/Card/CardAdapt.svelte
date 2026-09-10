<script lang="ts">
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<!--This allows for multiple Cards in a row, just like a grid-->
<div class="cardContainer flex">
    {@render children?.()}
</div>
