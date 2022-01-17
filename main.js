const { BrowserWindow, BrowserView, app, screen, ipcMain} = require('electron');
const path = require('path');
const ipc = ipcMain;

function createWindow(launchWidth, launchHeight) {

    const win = new BrowserWindow({
        width: launchWidth,
        height: launchHeight,
        minWidth: 800,
        minHeight: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('app/views/index.html');

    // Maximize Restore App
    ipc.on('windowResize', () => {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }
    })

    // Check if App is Maximized
    win.on('maximize', () => {
        win.webContents.send('windowFullscreen');
    });

    // Check if App is Restored
    win.on('unmaximize', () => {
        win.webContents.send('windowRestore');
    });

    // Minimize App
    ipc.on('windowMinimize', () => {
        win.minimize();
    })

    // Close App
    ipc.on('windowClose', () => {
        win.close();
    })

    // Switch to Home Page
    ipc.on('contentHome', () => {
        win.loadFile('app/views/index.html');
    })

    // Switch to Campaign Page
    ipc.on('contentCampaign', () => {
        win.loadFile('app/views/campaign.html');
    })

    // Switch to Profile Page
    ipc.on('contentProfile', () => {
        win.loadFile('app/views/profile.html');

        /*
        const view = new BrowserView();
        const viewSize = 
        win.setBrowserView(view);
        view.setBounds({ x: 50, y: 30, width: 800, height: 570 });
        view.setAutoResize({ width: true, height: true });
        view.webContents.loadURL('https://www.pathofexile.com/account/view-profile/Zizaran/characters');
        */
    })

    // Switch to Tasks Page
    ipc.on('contentTasks', () => {
        win.loadFile('app/views/tasks.html');
    })

    // Switch to Links Page
    ipc.on('contentLinks', () => {
        win.loadFile('app/views/links.html');
    })

    // Switch to Settings Page
    ipc.on('contentSettings', () => {
        win.loadFile('app/views/settings.html');
    })

}

app.whenReady().then(() => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { launchWidth, launchHeight } = primaryDisplay.workAreaSize;
    createWindow(launchWidth, launchHeight);
});

// Windows / Linux Close Window
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

