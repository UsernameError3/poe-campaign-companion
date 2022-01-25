const { ipcRenderer, contextBridge } = require('electron');

const apiConfig = {
    windowControls: {
        resizeWindow:       () => ipcRenderer.invoke('windowResize'),
        minimizeWindow:     () => ipcRenderer.invoke('windowMinimize'),
        closeWindow:        () => ipcRenderer.invoke('windowClose'),
    },
    navigation: {
        loadHome:           () => ipcRenderer.invoke('contentHome'),
        loadCampaign:       () => ipcRenderer.invoke('contentCampaign'),
        loadTasks:          () => ipcRenderer.invoke('contentTasks'),
        loadLinks:          () => ipcRenderer.invoke('contentLinks'),
        loadSettings:       () => ipcRenderer.invoke('contentSettings'),
        loadPOELab:         () => ipcRenderer.invoke('viewLab'),
        loadPOENinja:       () => ipcRenderer.invoke('viewNinja'),
        loadPOEAntiquary:   () => ipcRenderer.invoke('viewAntiquary'),
        loadPOEWiki:        () => ipcRenderer.invoke('viewWiki')
    },
    links: {
        addNewLink:         () => ipcRenderer.invoke('addNewLink'),
        updateLinkList:     () => ipcRenderer.invoke('updateLinkList')
    }
};

contextBridge.exposeInMainWorld("api", apiConfig)
