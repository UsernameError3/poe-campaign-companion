const { app, ipcMain } = require('electron');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const { fetch } = require('cross-fetch');
const ipc = ipcMain;

// Set UI Offsets in PX
const windowTitlebarOffset = 30;
const windowSidebarOffset = 50;

// Establish Cached BrowserViews
const view = require("./app/utils/window/view");
var labView = '';
var ninjaView = '';
var antiquaryView = '';
var wikiView = '';

app.allowRendererProcessReuse = true;
app.whenReady().then(() => {
    const window = require("./app/utils/window/window");
    mainWindow = window.createBrowserWindow();
    mainWindow.loadFile('app/views/index.html');

    // Block Ads
    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(mainWindow.webContents.session);
    });

    // Maximize Restore App
    ipc.on('windowResize', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.restore();
        } else {
            mainWindow.maximize();
        }
    })

    // Check if App is Maximized
    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('windowFullscreen');
    });

    // Check if App is Restored
    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('windowRestore');
    });

    // Minimize App
    ipc.on('windowMinimize', () => {
        mainWindow.minimize();
    });

    // Close App
    ipc.on('windowClose', () => {
        mainWindow.close();
    });

    // Switch to Home Page
    ipc.on('contentHome', () => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/index.html');
    });

    // Switch to Campaign Page
    ipc.on('contentCampaign', () => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/campaign.html');
    });

    // Switch to POE Lab Page
    ipc.on('contentLab', () => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/browserview.html');

        if (labView === '') {
            labView = view.createBrowserView('https://www.poelab.com/', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, labView, windowSidebarOffset, windowTitlebarOffset);
        }
    });

    // Switch to POE Ninja Page
    ipc.on('contentNinja', () => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/browserview.html');

        if (ninjaView === '') {
            ninjaView = view.createBrowserView('https://poe.ninja/', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, ninjaView, windowSidebarOffset, windowTitlebarOffset);
        }
    });

    // Switch to POE Antiquary Page
    ipc.on('contentAntiquary', () => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/browserview.html');

        if (antiquaryView === '') {
            antiquaryView = view.createBrowserView('https://poe-antiquary.xyz/', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, antiquaryView, windowSidebarOffset, windowTitlebarOffset);
        }
    });

    // Switch to POE Wiki Page
    ipc.on('contentWiki', () => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/browserview.html');
        
        if (wikiView === '') {
            wikiView = view.createBrowserView('https://www.poewiki.net/wiki/Path_of_Exile_Wiki', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, wikiView, windowSidebarOffset, windowTitlebarOffset);
        }
    });

    // Switch to Tasks Page
    ipc.on('contentTasks', () => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/tasks.html');
    });

    // Switch to Links Page
    ipc.on('contentLinks', () => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/links.html');
    });

    // Switch to Settings Page
    ipc.on('contentSettings', () => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/settings.html');
    });

});

// Windows / Linux Close Window
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

