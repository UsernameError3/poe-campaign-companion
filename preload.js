const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld("api", {
    resizeWindow:       () => ipcRenderer.invoke('windowResize'),
    minimizeWindow:     () => ipcRenderer.invoke('windowMinimize'),
    closeWindow:        () => ipcRenderer.invoke('windowClose'),
    loadHome:           () => ipcRenderer.invoke('contentHome'),
    loadCampaign:       () => ipcRenderer.invoke('contentCampaign'),
    loadTasks:          () => ipcRenderer.invoke('contentTasks'),
    loadLinks:          () => ipcRenderer.invoke('contentLinks'),
    loadSettings:       () => ipcRenderer.invoke('contentSettings'),
    loadPOELab:         () => ipcRenderer.invoke('viewLab'),
    loadPOENinja:       () => ipcRenderer.invoke('viewNinja'),
    loadPOEAntiquary:   () => ipcRenderer.invoke('viewAntiquary'),
    loadPOEWiki:        () => ipcRenderer.invoke('viewWiki')
})
