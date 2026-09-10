const { contextBridge, ipcRenderer, shell, webUtils } = require('electron');

contextBridge.exposeInMainWorld('nativeOperations', {
    on(eventName, callback) {
        ipcRenderer.on(eventName, callback)
    },
    async send(eventName, ...params) {
        return await ipcRenderer.send(eventName, ...params)
    },
    off(eventName, callback) {
        ipcRenderer.off(eventName, callback);
    },
    async invoke(channel, ...params) {
        return ipcRenderer.invoke(channel, ...params);
    },
    getFilePath(file) {
        return webUtils.getPathForFile(file);
    },
    removeAllListeners(name) {
        ipcRenderer.removeAllListeners(name);
    }
})