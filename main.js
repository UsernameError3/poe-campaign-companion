const { app, ipcMain } = require('electron');
// const db = require('./app/db/stores/todoItem');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const { fetch } = require('cross-fetch');

// Set UI Offsets in PX
const windowTitlebarOffset = 30;
const windowSidebarOffset = 50;

// global.db = db;

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

    // Block Ads - Inbuilt List
    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(mainWindow.webContents.session);
    });

    // Review IPC / Render Security w/ Preload
    // https://stackoverflow.com/questions/52236641/electron-ipc-and-nodeintegration

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
        mainWindow.loadFile('app/views/index.html');
    });

    ipcMain.handle('contentCampaign', (event) => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/campaign.html');
    });

    ipcMain.handle('contentLab', (event) => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/browserview.html');

        if (labView === '') {
            labView = view.createBrowserView('https://www.poelab.com/', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, labView, windowSidebarOffset, windowTitlebarOffset);
        }
    });

    ipcMain.handle('contentNinja', (event) => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/browserview.html');

        if (ninjaView === '') {
            ninjaView = view.createBrowserView('https://poe.ninja/', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, ninjaView, windowSidebarOffset, windowTitlebarOffset);
        }
    });

    ipcMain.handle('contentAntiquary', (event) => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/browserview.html');

        if (antiquaryView === '') {
            antiquaryView = view.createBrowserView('https://poe-antiquary.xyz/', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, antiquaryView, windowSidebarOffset, windowTitlebarOffset);
        }
    });

    ipcMain.handle('contentWiki', (event) => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/browserview.html');
        
        if (wikiView === '') {
            wikiView = view.createBrowserView('https://www.poewiki.net/wiki/Path_of_Exile_Wiki', mainWindow, windowSidebarOffset, windowTitlebarOffset);
        } else {
            view.loadBrowserView(mainWindow, wikiView, windowSidebarOffset, windowTitlebarOffset);
        }
    });

    ipcMain.handle('contentTasks', (event) => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/tasks.html');
    });

    ipcMain.handle('contentLinks', (event) => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/links.html');
    });

    ipcMain.handle('contentSettings', (event) => {
        view.detachBrowserView(mainWindow);
        mainWindow.loadFile('app/views/settings.html');
    });

});

// Windows / Linux Close Window
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
