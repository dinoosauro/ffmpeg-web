import type { FfmpegEventDetails } from "../../interfaces/ffmpeg";

/**
 * A list of all the console events to trigger 
 */
const registeredEvents = new Set<(info: FfmpegEventDetails) => void>();

const obj = {
    /**
     * Add an event listener for console updates
     */
    registerConsoleEvent: (fn: (info: FfmpegEventDetails) => void) => registeredEvents.add(fn),
    /**
     * Remove an already-added event listener for console updates
     */
    deleteConsoleEvent: (fn: (info: FfmpegEventDetails) => void) => registeredEvents.delete(fn),
    /**
     * Dispatch a console update
     */
    sendMessage: (info: FfmpegEventDetails) => {
        for (const event of registeredEvents) {
            try {
                event(info);
            } catch(ex) {
                console.error(ex);
            }
        }
    }
}

export default obj;