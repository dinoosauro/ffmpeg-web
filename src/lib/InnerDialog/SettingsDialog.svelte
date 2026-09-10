<script lang="ts">
    import CustomizationHandler from "../../ts/Customization/Themes";
    import Settings from "../../ts/TabOptions/Settings.svelte";
    import Writables from "../../ts/Writables.svelte";
    import Card from "../UIElements/Card/Card.svelte";
    import Chip from "../UIElements/ChipElements/Chip.svelte";
    import ChipContainer from "../UIElements/ChipElements/ChipContainer.svelte";
    import SingleThemeOption from "./SingleThemeOption.svelte";
    import Switch from "../UIElements/Switch.svelte";
    import BackgroundContentUI from "./BackgroundContentUI.svelte";
    import BackgroundContentUi from "./BackgroundContentUI.svelte";
    import { slide } from "svelte/transition";
    import OptionsPicker from "../OptionsPicker.svelte";
    import { getLang, languageCredits } from "../../ts/LanguageAdapt";
    import { GetImage, RerenderImageMap } from "../../ts/ImageHandler";
    import AdaptiveAsset from "../UIElements/AdaptiveAsset.svelte";
    import Themes from "../../ts/Customization/Themes";
     import ConversionOptions from "../../ts/TabOptions/ConversionOptions.svelte";
    /**
     * The CSS property that the user is editing
     */
    let opacitySelector: HTMLInputElement ;
    let propertyChanged = $state("--text");
    /**
     * The object that contains all the CSS properties to save
     */
    let currentProperties: any = $state({});
    /**
     * An array that contains the CSS key of the values to edit and their description. Follows the same structure as a ChipInterface[] object.
     */
    const themeProps = [
        { id: "--text", display: "Text color", selected: true },
        { id: "--background", display: "Background color" },
        { id: "--card", display: "Card color" },
        { id: "--row", display: "Row / Second card color" },
        { id: "--select", display: "Accent color" },
    ];
    /**
     * Update the `currentProperties` object (the one that contains all the CSS values for custom theming)
     */
    function updateCurrentProperties() {
        for (const { id } of themeProps) {
            const prop = getComputedStyle(document.body).getPropertyValue(id);
            currentProperties[id] = {
                str: prop.substring(0, 7),
                opacity: prop.substring(7, 9) || "ff",
            };
        }
    }
    /**
     * The name the user wants to give to their new theme
     */
    let themeName = $state("");
    updateCurrentProperties();
    /**
     * From a input[type=color] event, update the custom color property
     * @param e the Event where the input value can be fetched
     */
    function setCustomColor() {
        document.body.style.setProperty(
            propertyChanged,
            `${currentProperties[propertyChanged].str}${currentProperties[propertyChanged].opacity}`,
        );
        propertyChanged === "--select" && RerenderImageMap();
        propertyChanged === "--text" && Themes.applyCustomSelect();
    }
    function convertOpacityInput(e: Event) {
        const hexOpacity = (+(e.target as HTMLInputElement).value).toString(16);
        currentProperties[propertyChanged].opacity =
            `${hexOpacity.length === 1 ? "0" : ""}${hexOpacity}`;
        setCustomColor();
    }
    /**
     * The object that contains all the custom themes made by the user
     */
    let availableThemes: any = $state();
    /**
     * Refresh the available custom themes
     */
    function getNewTheme() {
        availableThemes = JSON.parse(
            localStorage.getItem("ffmpegWeb-CustomThemes") ?? "{}",
        );
    }
    getNewTheme();
    /**
     * The author of the displayed license
     */
    let showLicenseId = $state("2024 Dinoosauro");
    let currentLanguage = $state(localStorage.getItem("ffmpegWeb-SelectedLanguage") ?? navigator.language?.substring(0, 2) ?? "en")
    function saveLanguageChange(e: Event) {
        localStorage.setItem(
            "ffmpegWeb-SelectedLanguage",
            (e.target as HTMLInputElement).value,
        );
        currentLanguage = (e.target as HTMLInputElement).value;
    }
    let {closeFn}: {closeFn: () => void} = $props();
</script>

<div class="flex hcenter wcenter" style="gap: 10px">
    <AdaptiveAsset asset="settings"></AdaptiveAsset>
    <h2>{getLang("Settings")}</h2>
</div>
<Card forceColor={true} type={1}>
    <div class="flex hcenter" style="gap: 8px">
        <AdaptiveAsset asset="windowsettings" width={26}></AdaptiveAsset>
        <h3>{getLang("FFmpeg settings:")}</h3>
    </div>
    <p>{getLang("Use the following FFmpeg version:")}</p>
    <select
        bind:value={Settings.version}
        onchange={() => (Writables.ffmpegVersionUsed = Settings.version)}
    >
        <option value="0.11.x"
            >FFmpeg WebAssembly (0.11.x) {typeof window.nativeOperations !==
            "undefined"
                ? ""
                : `[${getLang("Suggested")}]`}</option
        >
        <option value="0.12.x"
            >FFmpeg WebAssembly (0.12.x) [{getLang(
                "Might not work on all codecs",
            )}]</option
        >
        {#if typeof window.nativeOperations !== "undefined"}
            <option value="native">Native [{getLang("Suggested")}]</option>
        {/if}
    </select>
    {#if Settings.version === "0.12.x"}
        <span in:slide={{ duration: 600 }} out:slide={{ duration: 600 }}>
            <br /><br />
            <Switch
                text={getLang(
                    "Enable multithreaded version of FFmpeg WebAssembly",
                )}
                onchange={enabled => (Settings.useMultiThreaded = enabled)}
                checked={Settings.useMultiThreaded}
            ></Switch><br />
            <Switch
                text={getLang(
                    "Use WORKERFS for file writing operations. This helps reducing RAM usage.",
                )}
                onchange={enabled => (Settings.enableWorkerFS = enabled)}
                checked={Settings.enableWorkerFS}
            ></Switch>
        </span>
    {:else}
        <br />
    {/if}<br />
    <Switch
        text={getLang("Exit after each timestamp conversion")}
        onchange={enabled => (Settings.exit.afterTimestamp = enabled)}
        checked={Settings.exit.afterTimestamp}
    ></Switch><br />
    <Switch
        text={getLang("Exit after each file conversion")}
        onchange={enabled => (Settings.exit.afterFile = enabled)}
        checked={Settings.exit.afterFile}
    ></Switch><br />
</Card>
{#if Settings.version !== "native"}
    <br />
    <Card forceColor={true} type={1}>
        <div class="flex hcenter" style="gap: 8px">
            <AdaptiveAsset asset="save" width={26}></AdaptiveAsset>

            <h3>{getLang("File output:")}</h3>
        </div>
        <select
            bind:value={Settings.storageMethod}
            onchange={() => (Writables.currentStorageMethod = Settings.storageMethod)}
        >
            {#if typeof window.showDirectoryPicker !== "undefined"}
                <optgroup
                    label={getLang(
                        "Will replace duplicates (direct access to File System)",
                    )}
                >
                    <option value="handle"
                        >{getLang("Use the File System API")}</option
                    >
                </optgroup>
            {/if}
            <optgroup
                label={getLang(
                    "Won't replace duplicate (no access to your device's file system)",
                )}
            >
                <option value="link">{getLang("Save using a link")}</option>
                <option value="zip"
                    >{getLang("Save as a zip file")}
                    {getLang(
                        "[Using JSZIP - might give errors on many files or large ones]",
                    )}</option
                >
                <option value="zipjs-blob"
                    >{getLang("Save as a zip file")}
                    {getLang("[Using Zip.JS - recommended]")}</option
                >
                <option value="zipjs">
                    {getLang("Save as a zip file")}
                    {getLang("[Using Zip.JS and streams - recommended; will use less RAM, but might have issues if the conversion takes a long time]")}
                </option>
            </optgroup>
        </select>
    </Card>
{/if}<br />
{#if Writables.ffmpegVersionUsed === "native"}
    <Card forceColor={true} type={1}>
        <div class="flex hcenter" style="gap: 8px">
            <AdaptiveAsset asset="games" width={26}></AdaptiveAsset>

            <h3>{getLang("Hardware acceleration")}</h3>
        </div>
        <p>
            {getLang(
                "Add arguments before the FFmpeg script to allow hardware acceleration. You can find presets for most hardware acceleration providers in the select below.",
            )}
        </p>
        <select
            bind:value={Settings.hardwareAcceleration.type}
            onchange={() => {
                Writables.showBufSize =
                    Settings.hardwareAcceleration.type === "vaapi" ||
                    Settings.hardwareAcceleration.type === "nvidia" ||
                    Settings.hardwareAcceleration.type === "amd";
                switch (Settings.hardwareAcceleration.type) {
                    case "no":
                    case "amd":
                    case "apple":
                        Settings.hardwareAcceleration.additionalProps = [];
                        break;
                    case "vaapi":
                        Settings.hardwareAcceleration.additionalProps = [
                            "-vaapi_device",
                            "/dev/dri/renderD128",
                        ].map((e) => {
                            return { id: crypto.randomUUID(), display: e };
                        });
                        ConversionOptions.videoOptions.useSlider = true;
                        break;
                    case "nvidia":
                        Settings.hardwareAcceleration.additionalProps = [
                            "-vsync",
                            "0",
                            "-hwaccel",
                            "cuda",
                            "-hwaccel_output_format",
                            "cuda",
                        ].map((e) => {
                            return { id: crypto.randomUUID(), display: e };
                        });
                        break;
                    case "intel":
                        Settings.hardwareAcceleration.additionalProps = [
                            "-init_hw_device",
                            "qsv=hw",
                        ].map((e) => {
                            return { id: crypto.randomUUID(), display: e };
                        });
                        break;
                }
            }}
        >
            <option value="no">{getLang("No hardware acceleration")}</option>
            <option value="nvidia">Nvidia (NVENC)</option>
            <option value="intel">Intel (QSV)</option>
            <option value="amd">AMD (AMF)</option>
            <option value="apple">Apple (videotoolbox)</option>
            <option value="vaapi"
                >Video Acceleration API (VAAPI, Linux only)</option
            >
            <option value="custom">{getLang("Custom syntax")}</option>
        </select>
        {#if Settings.hardwareAcceleration.type === "custom"}
            <br /><br />
            <Card forceColor={true}>
                <h4>{getLang("Custom arguments:")}</h4>
                <p>
                    {getLang(
                        "You can write custom arguments, that will be put at the start of the ffmpeg script, here.",
                    )}
                </p>
                <OptionsPicker arr="hw"></OptionsPicker>
            </Card>
        {/if}
        <br /><br />
        <Switch
            text={getLang(
                "Use AudioToolbox encoder when choosing standard AAC (not libfdk_aac) and ALAC audio codecs. Available only on macOS.",
            )}
            onchange={enabled =>
                (Settings.hardwareAcceleration.audioToolbox = enabled)}
            checked={Settings.hardwareAcceleration.audioToolbox}
        ></Switch><br />
    </Card><br />
{/if}
<Card forceColor={true} type={1}>
    <div class="flex hcenter" style="gap: 8px">
        <AdaptiveAsset asset="paintbucket" width={26}></AdaptiveAsset>

        <h3>{getLang("UI Customization:")}</h3>
    </div>
    <Card forceColor={true}>
        <h4>{getLang("Create a new theme:")}</h4>
        <p>
            {getLang(
                "You can find all the values you need to edit here. Make sure to save the theme before unloading the page!",
            )}
        </p>
        <br />
        <ChipContainer>
            <Chip
                onUserSelection={enabled => (propertyChanged = enabled)}
                selectionItems={themeProps}
            ></Chip>
        </ChipContainer><br />
        <div class="flex hcenter" style="gap: 10px">
            <input
                type="color"
                style="padding: 10px; background-color: var(--row)"
                bind:value={currentProperties[propertyChanged].str}
                oninput={setCustomColor}
            />
            <label>
                Opacity:
                <input
                    type="range"
                    min="0"
                    max="255"
                    value={parseInt(
                        currentProperties[propertyChanged].opacity,
                        16,
                    )}
                    bind:this={opacitySelector}
                    onchange={convertOpacityInput}
                />
            </label>
        </div>
        <br />
        <Card type={1} forceColor={true}>
            <label class="flex hcenter" style="gap: 10px">
                Theme name:
                <input type="text" bind:value={themeName} />
                <button
                    style="width: fit-content"
                    onclick={() => {
                        let obj = { ...currentProperties };
                        for (const property in obj)
                            obj[property] =
                                `${obj[property].str}${obj[property].opacity}`;
                        CustomizationHandler.saveTheme(
                            themeName || crypto.randomUUID(),
                            obj,
                        );
                        getNewTheme();
                    }}>{getLang("Save theme")}</button
                >
            </label>
        </Card>
    </Card><br />
    <Card forceColor={true}>
        <h4>{getLang("Manage current themes")}:</h4>
        <Card forceColor={true} type={1}>
            <div class="flex" style="flex-direction: column; gap: 5px">
                {#each Object.keys(CustomizationHandler.standardThemes) as key (key)}
                    <SingleThemeOption
                        {key}
                        themeChangedCallback={updateCurrentProperties}
                        themeDeletedCallback={getNewTheme}
                        isDefault={true}
                    ></SingleThemeOption>
                {/each}
                {#each Object.keys(availableThemes) as key (key)}
                    <SingleThemeOption
                        themeChangedCallback={updateCurrentProperties}
                        themeDeletedCallback={getNewTheme}
                        {key}
                    ></SingleThemeOption>
                {/each}
            </div>
        </Card>
    </Card><br />
    <Card forceColor={true}>
        <h4>{getLang("Background content:")}</h4>
        <p>{getLang("Use as background:")}</p>
        <BackgroundContentUI></BackgroundContentUI>
    </Card>
</Card><br />
<Card forceColor={true} type={1}>
    <div class="flex hcenter" style="gap: 8px">
        <AdaptiveAsset asset="remote" width={26}></AdaptiveAsset>
        <h3>{getLang("Remote control:")}</h3>
    </div>
    <p style="margin-top: 0px;">{getLang("You can share the conversion progress to a server you control, so that you can control the progress from anywhere. If you want to enable this completely optional feature, write the server URL below.")}</p>
    <label class="flex hcenter" style="gap: 5px">
        {getLang("Server URL:")}
        <input type="text" bind:value={Settings.shareProgressUrl}>
    </label><br>
    <a href="./progress-server.py" target="_blank" download="progress-server.py">{getLang("Click here to download the Python script to self-host the server")}</a>
</Card><br>
<Card forceColor={true} type={1}>
    <div class="flex hcenter" style="gap: 8px">
        <AdaptiveAsset asset="screenshot" width={26}></AdaptiveAsset>

        <h3>{getLang("Screensaver:")}</h3>
    </div>
    <Switch
        text={getLang("Enable screensaver")}
        onchange={enabled => (Settings.screenSaver.enabled = enabled)}
        checked={Settings.screenSaver.enabled}
    ></Switch>
    {#if Settings.screenSaver.enabled}
        <br />
        <label
            class="flex hcenter"
            style="gap: 5px"
            in:slide={{ duration: 600 }}
            out:slide={{ duration: 600 }}
        >
            {getLang("Enable screensaver after")}
            <input type="number" bind:value={Settings.screenSaver.timeout} />
            ms
        </label>
        <br />
        <Card forceColor={true}>
            <h4>{getLang("Screensaver background:")}</h4>
            <BackgroundContentUi type="screenSaver"></BackgroundContentUi>
        </Card><br />
        <Card forceColor={true}>
            <h4>{getLang("Available content in the screensaver:")}</h4>
            <Switch
                text={getLang("Show file name")}
                onchange={enabled =>
                    (Settings.screenSaver.options.showConversionName = enabled)}
                checked={Settings.screenSaver.options.showConversionName}
            ></Switch><br />
            <Switch
                text={getLang("Show conversion progress and console output")}
                onchange={enabled =>
                    (Settings.screenSaver.options.showConversionStatus =
                        enabled)}
                checked={Settings.screenSaver.options.showConversionStatus}
            ></Switch><br />
            <Switch
                text={getLang("Show the estimate time")}
                onchange={enabled =>
                    (Settings.screenSaver.options.showEstimate =
                        enabled)}
                checked={Settings.screenSaver.options.showEstimate}
            ></Switch><br />
            <Switch
                text={getLang("Enable screensaver in fullscreen mode")}
                checked={Settings.screenSaver.options.fullscreen}
                onchange={enabled =>
                    (Settings.screenSaver.options.fullscreen = enabled)}
            ></Switch>
        </Card><br />
        <label class="flex hcenter" style="gap: tpx">
            {getLang("Move content from top to bottom (and viceversa) every")}
            <input
                type="number"
                bind:value={Settings.screenSaver.options.moveContent}
            /> ms
        </label><br />
        <button
            in:slide={{ duration: 600 }}
            out:slide={{ duration: 600 }}
            onclick={() => {
                Writables.screensaverInfo.activationTime = Date.now();
                Writables.screensaverInfo.enabled = true;
                closeFn();
            }}>{getLang("Enable screensaver now")}</button
        >
    {/if}
</Card><br />
<Card type={1} forceColor={true}>
    <div class="flex hcenter" style="gap: 8px">
        <AdaptiveAsset width={26} asset="locallanguage"></AdaptiveAsset>
        <h3>Language:</h3>
    </div>
    <p>
        Language settings will be gradually applied. If you want to apply them
        now, refresh the page.
    </p>
    <select
        onchange={saveLanguageChange}
        value={currentLanguage}
    >
        <option value="en">English (EN)</option>
        <option value="it">Italiano (IT)</option>
        <option value="zh">中文 (ZH)</option>
    </select><br><br>
    <p>This language translation was made made by <a target="_blank" href={languageCredits.get(currentLanguage)?.githubLink ?? languageCredits.get("en")?.githubLink}>{languageCredits.get(currentLanguage)?.username ?? languageCredits.get("en")?.username}</a></p>
</Card><br />
<Card type={1} forceColor={true}>
    <div class="flex hcenter" style="gap: 8px">
        <AdaptiveAsset asset="alert" width={26}></AdaptiveAsset>

        <h3>{getLang("Alerts")}:</h3>
    </div>
    <Switch
        text={getLang("Enable alerts")}
        checked={Settings.alerts.show}
        onchange={enabled => (Settings.alerts.show = enabled)}
    ></Switch><br />
    {#if Settings.alerts.show}
        <Card forceColor={true}>
            <label class="flex hcenter" style="gap: 5px">
                {getLang("Close alert after")}
                <input type="number" bind:value={Settings.alerts.time} />
                ms
            </label><br />
            <button onclick={() => (Settings.alerts.ignored = [])}
                >{getLang("Reset ignored alerts")}</button
            >
        </Card>
    {/if}
</Card><br />
<Card type={1} forceColor={true}>
    <div class="flex hcenter" style="gap: 8px">
        <AdaptiveAsset asset="documentsave" width={26}></AdaptiveAsset>
        <h3>{getLang("Advanced file save preferences:")}</h3>
    </div>
    <Switch
        checked={Settings.fileSaver.keepInMemory}
        onchange={enabled => {
            Settings.fileSaver.keepInMemory = enabled;
            Writables.changedFileSave = enabled;
        }}
        text={getLang("Keep Blobs saved")}
    ></Switch><br />
    {#if !Settings.fileSaver.keepInMemory}
        <Card forceColor={true}>
            <Switch
                text={getLang(
                    "Immediately delete Blobs after download. Disable this if you aren't able to download files",
                )}
                onchange={enabled =>
                    (Settings.fileSaver.revokeObjectUrl = enabled)}
                checked={Settings.fileSaver.revokeObjectUrl}
            ></Switch>
        </Card><br />
    {/if}
    <Switch
        text={getLang("Save conversion preferences")}
        checked={localStorage.getItem("ffmpegWeb-SavePreferences") !== "a"}
        onchange={enabled =>
            localStorage.setItem(
                "ffmpegWeb-SavePreferences",
                enabled ? "b" : "a",
            )}
    ></Switch>
</Card><br />
<Card type={1} forceColor={true}>
    <div class="flex hcenter" style="gap: 8px">
        <AdaptiveAsset asset="handshake" width={26}></AdaptiveAsset>
        <h3>{getLang("Licenses")}:</h3>
    </div>
    <p>
        {getLang(
            "You can find here both the license of ffmpeg-web and the licenses of the open source libraries used for this project. Click on the switch to see them.",
        )}
    </p>
    <ChipContainer type={0}>
        <Chip
            useRowColor={true}
            onUserSelection={id => (showLicenseId = id)}
            selectionItems={[
                {
                    display: "ffmpeg-web",
                    id: "2024 Dinoosauro",
                    selected: true,
                },
                { display: "ffmpeg.wasm", id: "2019 Jerome Wu" },
                {
                    display: "JSZip",
                    id: "2009-2016 Stuart Knightley, David Duponchel, Franz Buchinger, António Afonso",
                },
                {
                    display: "Electron",
                    id: "Electron contributors & 2013-2020 GitHub Inc.",
                },
                { display: "Svelte", id: "2016-24 these people" },
                { display: "context-filter-polyfill", id: "2019 David Enke" },
                { display: "zip.js", id: "2023, Gildas Lormeau" },
                {display: "node-mv (Electron version only)", id: "2014 Andrew Kelley"}
            ]}
        ></Chip>
    </ChipContainer><br />
    <Card forceColor={true}>
        {#if showLicenseId === "2023, Gildas Lormeau"}
            <p>
                BSD 3-Clause License<br /><br /> Copyright (c) {showLicenseId}<br
                /><br />

                Redistribution and use in source and binary forms, with or
                without modification, are permitted provided that the following
                conditions are met:<br /><br /> 1. Redistributions of source
                code must retain the above copyright notice, this list of
                conditions and the following disclaimer.<br /><br /> 2.
                Redistributions in binary form must reproduce the above
                copyright notice, this list of conditions and the following
                disclaimer in the documentation and/or other materials provided
                with the distribution.<br /><br /> 3. Neither the name of the
                copyright holder nor the names of its contributors may be used
                to endorse or promote products derived from this software
                without specific prior written permission.<br /><br /> THIS SOFTWARE
                IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
                ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
                THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
                PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
                CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
                EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
                PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
                PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
                OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
                NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
                SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
            </p>
        {:else}
            <p>
                MIT License<br /><br />
                Copyright (c) {showLicenseId}<br /><br />
                Permission is hereby granted, free of charge, to any person obtaining
                a copy of this software and associated documentation files (the "Software"),
                to deal in the Software without restriction, including without limitation
                the rights to use, copy, modify, merge, publish, distribute, sublicense,
                and/or sell copies of the Software, and to permit persons to whom
                the Software is furnished to do so, subject to the following conditions:<br
                /><br />
                The above copyright notice and this permission notice shall be included
                in all copies or substantial portions of the Software.<br /><br
                />
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
                SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
                OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
                ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
                OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
        {/if}
    </Card><br />
    <Card forceColor={true}>
        <h4>{getLang("About this website")}:</h4>
        <div class="flex hcenter" style="gap: 5px">
            <AdaptiveAsset asset="icon" width={24}></AdaptiveAsset>
            <strong>ffmpeg-web {window.ffmpegWebVersion}</strong>
        </div>
        <br />
        <a target="_blank" href="https://github.com/Dinoosauro/ffmpeg-web"
            >{getLang("View on GitHub")}</a
        ><br /><br />
        <Switch
            text={getLang("Show installation instructions")}
            onchange={enabled => {
                Settings.showInstallationPrompt = enabled;
                ( Writables.showInstallationCard = enabled);
            }}
            checked={Settings.showInstallationPrompt}
        ></Switch><br />
        <button onclick={() => (Writables.updateDialogShown = true)}
            >{getLang("Show update changelog")}</button
        >
    </Card>
</Card>
