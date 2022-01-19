const { BrowserWindow, BrowserView, app, screen, ipcMain} = require('electron');
const path = require('path');
const ipc = ipcMain;

app.allowRendererProcessReuse = true;
app.whenReady().then(() => {
    // const primaryDisplay = screen.getPrimaryDisplay();
    // const { launchWidth, launchHeight } = primaryDisplay.workAreaSize;
    // createWindow(launchWidth, launchHeight);

    const window = require("./app/utils/window/window");
    mainWindow = window.createBrowserWindow();
    mainWindow.loadFile('app/views/index.html');

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
        mainWindow.loadFile('app/views/index.html');
    });

    // Switch to Campaign Page
    ipc.on('contentCampaign', () => {
        mainWindow.loadFile('app/views/campaign.html');
    });

    // Switch to POE Lab Page
    ipc.on('contentLab', () => {
        mainWindow.loadFile('app/views/poelab.html');
    });

    // Switch to POE Ninja Page
    ipc.on('contentNinja', () => {
        mainWindow.loadFile('app/views/poeninja.html');
    });

    // Switch to POE Antiquary Page
    ipc.on('contentAntiquary', () => {
        mainWindow.loadFile('app/views/poeantiquary.html');
    });

    // Switch to POE Wiki Page
    ipc.on('contentWiki', () => {
        mainWindow.loadFile('app/views/poewiki.html');
    });

    // Switch to Tasks Page
    ipc.on('contentTasks', () => {
        mainWindow.loadFile('app/views/tasks.html');
    });

    // Switch to Links Page
    ipc.on('contentLinks', () => {
        mainWindow.loadFile('app/views/links.html');
    });

    // Switch to Settings Page
    ipc.on('contentSettings', () => {
        mainWindow.loadFile('app/views/settings.html');
    });

});

// Windows / Linux Close Window
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

