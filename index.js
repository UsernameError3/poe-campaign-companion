const { BrowserWindow, app, ipcMain} = require('electron');
const path = require('path');
const ipc = ipcMain;

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 680,
        minWidth: 940,
        minHeight: 560,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('app/views/index.html');
    win.setBackgroundColor('#101010')

    // Minimize App
    ipc.on('minimizeApp', () => {
        win.minimize();
    })

    // Maximize Restore App
    ipc.on('maximizeRestoreApp', () => {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }
    })

    // Check if App is Maximized
    win.on('maximize', () => {
        win.webContents.send('isMaximized');
    });

    // Check if App is Restored
    win.on('unmaximize', () => {
        win.webContents.send('isRestored');
    });

    // Close App
    ipc.on('closeApp', () => {
        win.close();
    })

}

app.whenReady().then(() => {
    createWindow();
});

// Windows / Linux Close Window
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

