const { app, ipcMain } = require('electron');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const { fetch } = require('cross-fetch');
const fs = require('fs');

// Set UI Offsets in PX
const windowTitlebarOffset = 30;
const windowSidebarOffset = 50;

// Database Stuff
const Datastore = require('electron-store');
// const todoItemSchema = require('../schemas/todoItem');

const todoItemSchema = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
        },
        isDone: {
            type: 'boolean',
            default: false
        }
    },
};

const store = new Datastore({todoItemSchema});



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

    ipcMain.handle('contentCampaign', (event) => {
        view.detachBrowserView(mainWindow);
        return 'CampaignTesting';
    });

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

    // Links

    ipcMain.handle('addNewLink', (event) => {
        console.log('input: ');
    });

    /*
    ipcMain.handle('addNewLink', (event, dirtyInput) => {
        console.log('input: ', dirtyInput);
        if (dirtyInput) {
            db.create({content: dirtyInput}).then(result => {
                console.log('result: ', result);
                return;
            });
        } else {
            console.log('no input.');
            return;
        }
    });
    */

    ipcMain.handle('updateLinkList', (event, dirtyInput) => {
        db.readAll().then(result => {
            return result;
        });
    });

});

// Windows / Linux Close Window
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
