<script lang="ts">
    import ImageToVideoLogic from "../../ts/CommandBuilderLogic/ImageToVideoLogic";
    import FFmpegFileNameHandler from "../../ts/FFmpegUtils/FFmpegHandleFileName";
    import { getLang } from "../../ts/LanguageAdapt";
    import ConversionOptions from "../../ts/TabOptions/ConversionOptions";
    import AdaptiveAsset from "../UIElements/AdaptiveAsset.svelte";
    import Card from "../UIElements/Card/Card.svelte";
    import Dialog from "../UIElements/Dialog.svelte";
    import ImageToVideoTransitionSelect from "./ImageToVideoTransitionSelect.svelte";
    /**
     * All the files that the user has selected, even if they don't look like images (maybe the user has changed their extension)
     */
    export let fetchedFiles: File[];
    /**
     * The output object with all the information to convert these images to a video
     */
    let mappedFiles = fetchedFiles.map(i => {return {file: i, id: crypto.randomUUID(), url: URL.createObjectURL(i), duration: 5, transition: "none", transitionKey: "none", transitionDuration: 1}});
    /**
     * The function to call to close this dialog
     */
    export let discardOption: () => void;
    /**
     * The possible FileSystemDirectoryHandle to write the output video directly on device.
     */
    export let handle: FileSystemDirectoryHandle | undefined;
    /**
     * Maximum width of all the loaded images
     */
    let currentWidth = 0;
    /**
     * Maximum height of all the loaded images
     */
    let currentHeight = 0;
    /**
     * Update the `currentWidth` and `currentHeight` properties after an image has been successfully loaded
     * @param e the onload Event
     */
    function updateImageProps(e: Event) {
        if ((e.target as HTMLImageElement).naturalWidth > currentWidth) currentWidth = (e.target as HTMLImageElement).naturalWidth;
        if ((e.target as HTMLImageElement).naturalHeight > currentHeight) currentHeight = (e.target as HTMLImageElement).naturalHeight;
    }
</script>

<Dialog closeFunction={discardOption}>
    <div class="flex hcenter wcenter" style="gap: 10px">
        <AdaptiveAsset asset="filmstripimage"></AdaptiveAsset>
        <h2>{getLang("Image to video")}:</h2>
    </div>
    <Card forceColor={true} type={1}>
        <p>{getLang("Here you can see and sort the images you want to merge. If you don't want to add an image, put \"0\" as its duration and it'll be skipped. You can also add some transitions, but keep in mind that this will greatly slow the conversion, especially if you're not using a native version of FFmpeg.")}</p>
        <div style="overflow: auto">
        <table>
            <thead>
                <tr>
                    <th>{getLang("Image and position")}:</th>
                    <th>{getLang("File name")}:</th>
                    <th>{getLang("Duration (in seconds)")}:</th>
                    <th>{getLang("Transition")}:</th>
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
                        <td>
                            <ImageToVideoTransitionSelect selectedKey={file.transitionKey} on:edit={({detail}) => (mappedFiles[mappedFiles.findIndex(i => i.id === file.id)].transition = detail)} on:editKey={({detail}) => (mappedFiles[mappedFiles.findIndex(i => i.id === file.id)].transitionKey = detail)} selectedValue={file.transition} on:editDuration={({detail}) => (mappedFiles[mappedFiles.findIndex(i => i.id === file.id)].transitionDuration = detail)} currentDuration={file.transitionDuration}></ImageToVideoTransitionSelect>
                        </td>
                    </tr>
            {/each}
            </tbody>
        </table></div><br>
        <button on:click={() => {
            ImageToVideoLogic({files: mappedFiles.filter(i => i.duration !== 0), width: ConversionOptions.imageToVideo.autoWidth ? currentWidth : ConversionOptions.imageToVideo.width, height: ConversionOptions.imageToVideo.autoWidth ? currentHeight : ConversionOptions.imageToVideo.height}, handle);
            discardOption();
        }}>{getLang("Start conversion")}</button>
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
        background-color: var(--row) !important;
    }
</style>