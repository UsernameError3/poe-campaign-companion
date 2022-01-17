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

}

app.whenReady().then(() => {
    createWindow();
});

// Windows / Linux Close Window
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

