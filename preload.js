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
    campaign: {
        loadCampaignHome:   () => ipcRenderer.invoke('contentHome'),
        loadCampaignAct01:  () => ipcRenderer.invoke('contentCampaignAct01'),
        loadCampaignAct02:  () => ipcRenderer.invoke('contentCampaignAct02'),
        loadCampaignAct03:  () => ipcRenderer.invoke('contentCampaignAct03'),
        loadCampaignAct04:  () => ipcRenderer.invoke('contentCampaignAct04'),
        loadCampaignAct05:  () => ipcRenderer.invoke('contentCampaignAct05'),
        loadCampaignAct06:  () => ipcRenderer.invoke('contentCampaignAct06'),
        loadCampaignAct07:  () => ipcRenderer.invoke('contentCampaignAct07'),
        loadCampaignAct08:  () => ipcRenderer.invoke('contentCampaignAct08'),
        loadCampaignAct09:  () => ipcRenderer.invoke('contentCampaignAct09'),
        loadCampaignAct10:  () => ipcRenderer.invoke('contentCampaignAct10')
    },
    links: {
        addNewLink:         () => ipcRenderer.invoke('addNewLink'),
        updateLinkList:     () => ipcRenderer.invoke('updateLinkList')
    }
};

contextBridge.exposeInMainWorld("api", apiConfig)
