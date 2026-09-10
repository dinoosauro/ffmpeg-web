<script lang="ts">
    import { onMount } from "svelte";
    import {
        GetImage,
        UpdateImageMap,
        type AvailableAssets,
    } from "../../ts/ImageHandler";

    interface Props {
        asset: AvailableAssets;
        width?: number;
    }

    let { asset, width = 32 }: Props = $props();
</script>

<img {width} height={width} use:UpdateImageMap={asset} alt={asset} src={GetImage(asset)} />
