import { get } from "svelte/store";
import Settings from "../TabOptions/Settings.svelte";
import Writables from "../Writables.svelte";
/**
 * The number that identifies the timeout created, so that it can be deleted if the user presses somewhere in the screen
 */
let currentTimeout: number | undefined;
function handleScreensaver() {
    if (!Settings.screenSaver.enabled || (Date.now() - Writables.screensaverInfo.activationTime) < 1500) return;
    Writables.screensaverInfo.enabled = false;
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(() => {
        if (!Settings.screenSaver.enabled) return;
        Writables.screensaverInfo.enabled = true;
        Writables.screensaverInfo.activationTime = Date.now();
    }, Settings.screenSaver.timeout) as unknown as number
}
for (const item of ["mousemove", "pointermove", "touchmove", "scroll", "keypress"]) window.addEventListener(item, handleScreensaver);
