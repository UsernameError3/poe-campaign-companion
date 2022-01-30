const { app, ipcMain } = require('electron');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const { fetch } = require('cross-fetch');
const fs = require('fs');

// Set UI Offsets in PX
const windowTitlebarOffset = 30;
const windowSidebarOffset = 50;


// Establish Cached BrowserViews
const view = require("./app/utils/window/view");
var labView = '';
var ninjaView = '';
var antiquaryView = '';
var wikiView = '';

// Application Logic
app.allowRendererProcessReuse = true;
app.whenReady().then(() => {
    const window = require("./app/utils/window/window");
    mainWindow = window.createBrowserWindow();
    mainWindow.loadFile('app/views/index.html');

    // Block Ads - Inbuilt List
    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(mainWindow.webContents.session);
    });

    mainWindow.webContents.openDevTools()

    // Handle Preload API Calls from Renderer
    ipcMain.handle('windowResize', (event) => {
        if (mainWindow.isMaximized()) {
            mainWindow.restore();
            return false;
        } else {
            mainWindow.maximize();
            return true;
        }
    });

    ipcMain.handle('windowMinimize', (event) => {
        mainWindow.minimize();
    });

    ipcMain.handle('windowClose', (event) => {
        mainWindow.close();
    });

    ipcMain.handle('contentHome', (event) => {
        view.detachBrowserView(mainWindow);
        return 'HomeTesting';
    });

    /* ---- Campaign Nav ---- */

    // Loads Campaign Home Page
    ipcMain.handle('contentCampaign', (event) => {
        view.detachBrowserView(mainWindow);
        const campaignBodyContent = fs.readFileSync('app/views/components/campaign/windowBodyContent.html', 'utf-8');
        return campaignBodyContent;
    });

    // Loads Campaign Act 1 Page
    ipcMain.handle('contentCampaignAct01', (event) => {
        view.detachBrowserView(mainWindow);
        const campaignBodyContent = fs.readFileSync('app/views/components/campaign/acts/campaignAct01.html', 'utf-8');
        return campaignBodyContent;
    });

    // Loads Campaign Act 2 Page
    ipcMain.handle('contentCampaignAct02', (event) => {
        view.detachBrowserView(mainWindow);
        const campaignBodyContent = fs.readFileSync('app/views/components/campaign/acts/campaignAct02.html', 'utf-8');
        return campaignBodyContent;
    });

    // Loads Campaign Act 3 Page
    ipcMain.handle('contentCampaignAct03', (event) => {
        view.detachBrowserView(mainWindow);
        const campaignBodyContent = fs.readFileSync('app/views/components/campaign/acts/campaignAct03.html', 'utf-8');
        return campaignBodyContent;
    });

    // Loads Campaign Act 4 Page
    ipcMain.handle('contentCampaignAct04', (event) => {
        view.detachBrowserView(mainWindow);
        const campaignBodyContent = fs.readFileSync('app/views/components/campaign/acts/campaignAct04.html', 'utf-8');
        return campaignBodyContent;
    });

    // Loads Campaign Act 5 Page
    ipcMain.handle('contentCampaignAct05', (event) => {
        view.detachBrowserView(mainWindow);
        const campaignBodyContent = fs.readFileSync('app/views/components/campaign/acts/campaignAct05.html', 'utf-8');
        return campaignBodyContent;
    });

    // Loads Campaign Act 6 Page
    ipcMain.handle('contentCampaignAct06', (event) => {
        view.detachBrowserView(mainWindow);
        const campaignBodyContent = fs.readFileSync('app/views/components/campaign/acts/campaignAct06.html', 'utf-8');
        return campaignBodyContent;
    });

    // Loads Campaign Act 7 Page
    ipcMain.handle('contentCampaignAct07', (event) => {
        view.detachBrowserView(mainWindow);
        const campaignBodyContent = fs.readFileSync('app/views/components/campaign/acts/campaignAct07.html', 'utf-8');
        return campaignBodyContent;
    });

    // Loads Campaign Act 8 Page
    ipcMain.handle('contentCampaignAct08', (event) => {
        view.detachBrowserView(mainWindow);
        const campaignBodyContent = fs.readFileSync('app/views/components/campaign/acts/campaignAct08.html', 'utf-8');
        return campaignBodyContent;
    });

    // Loads Campaign Act 9 Page
    ipcMain.handle('contentCampaignAct09', (event) => {
        view.detachBrowserView(mainWindow);
        const campaignBodyContent = fs.readFileSync('app/views/components/campaign/acts/campaignAct09.html', 'utf-8');
        return campaignBodyContent;
    });

    // Loads Campaign Act 10 Page
    ipcMain.handle('contentCampaignAct10', (event) => {
        view.detachBrowserView(mainWindow);
        const campaignBodyContent = fs.readFileSync('app/views/components/campaign/acts/campaignAct10.html', 'utf-8');
        return campaignBodyContent;
    });


    // Loads Task Page
    ipcMain.handle('contentTasks', (event) => {
        view.detachBrowserView(mainWindow);
        return 'TasksTesting';
    });

    ipcMain.handle('contentLinks', (event) => {
        view.detachBrowserView(mainWindow);
        const linkBodyContent = fs.readFileSync('app/views/components/links/windowBodyContent.html', 'utf-8');
        return linkBodyContent;
    });

    ipcMain.handle('contentSettings', (event) => {
        view.detachBrowserView(mainWindow);
        return 'SettingsTesting';
    });


    ipcMain.handle('viewLab', (event) => {
        view.detachBrowserView(mainWindow);

        if (labView === '') {
            labView = view.createBrowserView('https://www.poelab.com/', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, labView, windowSidebarOffset, windowTitlebarOffset);
        }
        return;
    });

    ipcMain.handle('viewNinja', (event) => {
        view.detachBrowserView(mainWindow);

        if (ninjaView === '') {
            ninjaView = view.createBrowserView('https://poe.ninja/', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, ninjaView, windowSidebarOffset, windowTitlebarOffset);
        }
        return;
    });

    ipcMain.handle('viewAntiquary', (event) => {
        view.detachBrowserView(mainWindow);

        if (antiquaryView === '') {
            antiquaryView = view.createBrowserView('https://poe-antiquary.xyz/', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, antiquaryView, windowSidebarOffset, windowTitlebarOffset);
        }
        return;
    });

    ipcMain.handle('viewWiki', (event) => {
        view.detachBrowserView(mainWindow);

        if (wikiView === '') {
            wikiView = view.createBrowserView('https://www.poewiki.net/wiki/Path_of_Exile_Wiki', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, wikiView, windowSidebarOffset, windowTitlebarOffset);
        }
        return;
    });

});

// Windows / Linux Close Window
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
