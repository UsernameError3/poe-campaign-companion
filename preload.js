const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld("api", {
    resizeWindow:       () => ipcRenderer.invoke('windowResize'),
    minimizeWindow:     () => ipcRenderer.invoke('windowMinimize'),
    closeWindow:        () => ipcRenderer.invoke('windowClose'),
    loadHome:           () => ipcRenderer.invoke('contentHome'),
    loadCampaign:       () => ipcRenderer.invoke('contentCampaign'),
    loadPOELab:         () => ipcRenderer.invoke('contentLab'),
    loadPOENinja:       () => ipcRenderer.invoke('contentNinja'),
    loadPOEAntiquary:   () => ipcRenderer.invoke('contentAntiquary'),
    loadPOEWiki:        () => ipcRenderer.invoke('contentWiki'),
    loadTasks:          () => ipcRenderer.invoke('contentTasks'),
    loadLinks:          () => ipcRenderer.invoke('contentLinks'),
    loadSettings:       () => ipcRenderer.invoke('contentSettings')
})
