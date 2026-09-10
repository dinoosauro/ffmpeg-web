<script lang="ts">
    import CustomizationHandler from "../../ts/Customization/Themes";
    import { GetImage } from "../../ts/ImageHandler";
    import Card from "../UIElements/Card/Card.svelte";
    
    
    interface Props {
        /**
         * The theme name (and, so, the key to the CustomThemes or the StandardThemes object)
         */
        key: string;
        /**
         * If the theme is one of the default ones or not
         */
        isDefault?: boolean;
        /**
         * Function called when the theme has been changed by the user
         */
        themeChangedCallback: () => void,
        /**
         * Function called when the theme has been deleted by the user
         */
        themeDeletedCallback: () => void
    }
    let { key, isDefault = false, themeChangedCallback, themeDeletedCallback }: Props = $props();
    /**
     * Get the current theme properties
     */
    let getThemeProps = (
        isDefault
            ? CustomizationHandler.standardThemes
            : JSON.parse(localStorage.getItem("ffmpegWeb-CustomThemes") ?? "{}")
    )[key];
</script>

<Card forceColor={true}>
    <div style="position: relative; min-height: 24px">
        {key}
        <button
            class="circularBtn"
            style={`position: absolute; right: 10px; background-color: ${getThemeProps["--row"]}`}
            onclick={() => {
                CustomizationHandler.applyTheme(key, isDefault);
                themeChangedCallback();
            }}
        >
            <div class="flex hcenter wcenter">
                <img
                    src={GetImage("colorfill", getThemeProps["--select"])}
                    width="16px"
                    height="16px"
                    alt="Color bucket: apply the current theme"
                />
            </div>
        </button>
        <button
            class="circularBtn"
            style={`position: absolute; right: 44px; background-color: ${getThemeProps["--row"]}`}
            onclick={() => {
                let a = document.createElement("a");
                a.href = URL.createObjectURL(
                    new Blob([JSON.stringify({ [key]: getThemeProps })]),
                );
                a.download = `FFmpegWeb-Theme-${key}.json`;
                a.click();
            }}
        >
            <div class="flex hcenter wcenter">
                <img
                    src={GetImage("arrowdownload", getThemeProps["--select"])}
                    width="16px"
                    height="16px"
                    alt="Download icon: download the current theme as a JSON file"
                />
            </div>
        </button>
        {#if !isDefault}
            <button
                class="circularBtn"
                style={`position: absolute; right: 78px; background-color: ${getThemeProps["--row"]}`}
                onclick={() => {
                    const currentThemes = JSON.parse(
                        localStorage.getItem("ffmpegWeb-CustomThemes") ?? "{}",
                    );
                    delete currentThemes[key];
                    localStorage.setItem(
                        "ffmpegWeb-CustomThemes",
                        JSON.stringify(currentThemes),
                    );
                    themeDeletedCallback();
                }}
            >
                <div class="flex hcenter wcenter">
                    <img
                        src={GetImage("delete", getThemeProps["--select"])}
                        width="16px"
                        height="16px"
                        alt="Delete icon: remove the current theme"
                    />
                </div>
            </button>
        {/if}
    </div>
</Card>

<style>
    .circularBtn {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        background-color: var(--row);
        padding: 2px;
    }
</style>
