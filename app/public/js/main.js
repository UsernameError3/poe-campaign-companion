const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

// Minimize App
minimizeButton.addEventListener('click', () => {
    ipc.send('minimizeApp');
});

// Maximize Restore App Logic
function changeResizeButton(isMaximizedApp) {
    if (isMaximizedApp) {
        resizeButton.title = 'Restore';
        resizeButton.classList.remove('maximize-button');
        resizeButton.classList.add('restore-button');
    } else {
        resizeButton.title = 'Maximize';
        resizeButton.classList.remove('restore-button');
        resizeButton.classList.add('maximize-button');
    }
}

// Maximize Restore App
resizeButton.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp');
});

// Maximize App
ipc.on('isMaximized', () => {
    changeResizeButton(true);
});

// Restore App
ipc.on('isRestored', () => {
    changeResizeButton(false);
});

// Close App
closeButton.addEventListener('click', () => {
    ipc.send('closeApp');
});

