<script lang="ts">
    import { onMount } from "svelte";

    import Settings from "../../ts/TabOptions/Settings.svelte";
    import Card from "../UIElements/Card/Card.svelte";
    import Switch from "../UIElements/Switch.svelte";
    import Writables from "../../ts/Writables.svelte";
    import { getLang } from "../../ts/LanguageAdapt";
    import { GetImage } from "../../ts/ImageHandler";
    import AdaptiveAsset from "../UIElements/AdaptiveAsset.svelte";
    /**
     * The link that'll be used for re-downloading the file
     */
    let showLink = $state("");
    /**
     * The Select that allows the user to choose which file to redownload
     */
    let redownloadSelect: HTMLSelectElement;
    $effect(() => {
        // Writables.fileUrls is the property where all the file URLs and names are contained. In this case, it's created an option for every file available
        if (!redownloadSelect) return;
        redownloadSelect.innerHTML = "";
        for (const { path, name } of Writables.fileUrls) {
            const option = document.createElement("option");
            option.value = path;
            option.textContent = name;
            redownloadSelect.append(option);
        }
        changeSelect();
    })
    function changeSelect() {
        showLink =
            Writables.fileUrls.find((e) => e.path === redownloadSelect.value)?.path ??
            "";
    }
</script>

<Card>
    <div class="flex hcenter wcenter">
        <AdaptiveAsset asset="documentqueue"></AdaptiveAsset>
        <h2>{getLang("Re-download files")}</h2>
    </div>
    <Card type={1}>
        <p>
            {getLang("Choose from the select below the files to re-download.")}
        </p>
        <select onchange={() => changeSelect()} bind:this={redownloadSelect}>
        </select>
        {#if (showLink || "") !== ""}
            <br /><br />
            <Card>
                <a
                    href={Writables.fileUrls.find((e) => e.path === showLink)?.path}
                    download={Writables.fileUrls.find((e) => e.path === showLink)?.name}
                    >{getLang("Download file")}</a
                ><br /><br />
                <button
                    onclick={() => {
                        URL.revokeObjectURL(showLink);
                        Writables.fileUrls.splice(Writables.fileUrls.findIndex((e) => e.path === showLink), 1)
                    }}>{getLang("Delete Blob from memory")}</button
                >
            </Card>
        {/if}
    </Card>
</Card>
