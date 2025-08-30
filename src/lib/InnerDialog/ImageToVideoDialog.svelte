<script lang="ts">
    import ImageToVideoLogic from "../../ts/CommandBuilderLogic/ImageToVideoLogic";
    import FFmpegFileNameHandler from "../../ts/FFmpegUtils/FFmpegHandleFileName";
    import { getLang } from "../../ts/LanguageAdapt";
    import AdaptiveAsset from "../UIElements/AdaptiveAsset.svelte";
    import Card from "../UIElements/Card/Card.svelte";
    import Dialog from "../UIElements/Dialog.svelte";

    export let fetchedFiles: File[];
    $: mappedFiles = fetchedFiles.map(i => {return {file: i, id: crypto.randomUUID(), url: URL.createObjectURL(i), duration: 5}});
    export let discardOption: () => void;
    export let handle: FileSystemDirectoryHandle | undefined;
    let currentWidth = 0;
    let currentHeight = 0;
    function updateImageProps(e: Event) {
        if ((e.target as HTMLImageElement).naturalWidth > currentWidth) currentWidth = (e.target as HTMLImageElement).naturalWidth;
        if ((e.target as HTMLImageElement).naturalHeight > currentHeight) currentHeight = (e.target as HTMLImageElement).naturalHeight;
    }
</script>

<Dialog closeFunction={discardOption}>
    <div class="flex hcenter wcenter" style="gap: 10px">
        <AdaptiveAsset asset="settings"></AdaptiveAsset>
        <h2>{getLang("Image to video:")}</h2>
    </div>
    <Card forceColor={true} type={1}>
        <p>Sort the files you want to upload, and sort them. If you don't want to add an image, put "0" as its duration and it'll be skipped.</p>
        <table>
            <thead>
                <tr>
                    <th>Image and position:</th>
                    <th>File name:</th>
                    <th>Duration (in seconds):</th>
                </tr>
            </thead>
            <tbody>
            {#each mappedFiles as file, i (file.id)}
                    <tr>
                        <td>
                            <img on:load={(e) => updateImageProps(e)} src={file.url}>
                            <strong style="text-align: center; display: block">
                                <input step="1" type="number" style="width: fit-content; appearance: none;" value={i + 1} min="1" max={mappedFiles.length} on:change={(e) => {
                                    mappedFiles.splice(+e.currentTarget.value - 1, 0, mappedFiles.splice(i, 1)[0]);
                                    mappedFiles = [...mappedFiles];
                                }}>
                            </strong>
                        </td>
                        <td style="word-break: break-all;overflow-wrap: break-word; white-space: normal;">
                            {file.file.name}
                        </td>
                        <td><input type="number" min="0" value={file.duration} on:change={(e) => {
                            mappedFiles[mappedFiles.findIndex(i => i.id === file.id)].duration = +e.currentTarget.value;
                        }}></td>
                    </tr>
            {/each}
            </tbody>
        </table><br>
        <button on:click={() => {
            ImageToVideoLogic({files: mappedFiles, width: currentWidth, height: currentHeight}, handle);
            discardOption();
        }}>Start conversion</button>
    </Card>
</Dialog>

<style>
    img {
        width: 100%;
        height: auto;
        max-height: 30vh;
        object-fit: contain;
        border-radius: 8px;
        border: 1px solid var(--text);
        margin-bottom: 10px;
    }
    input {
        background-color: var(--row);
    }
</style>