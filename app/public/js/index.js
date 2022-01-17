const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;


function changeResizeButton(isMaximizedApp) {
    if (isMaximizedApp) {
        resizeButton.innerHTML = '<svg class="window-button-svg" xmlns="http://www.w3.org/2000/svg" width="13.35" height="13.35" viewBox="0 0 13.35 13.35"><path d="M7.35,7.35v-2H18.68V16.65h-2v2H5.32V7.35Zm1.11,0h8.19v8.19h.92V6.43H8.46Zm7.08,1.11H6.43v9.11h9.11Z" transform="translate(-5.32 -5.32)"/></svg>'
        resizeButton.classList.remove('maximize-button');
        resizeButton.classList.add('restore-button');
        resizeButton.title = 'Restore';
    } else {
        resizeButton.innerHTML = '<svg class="window-button-svg" xmlns="http://www.w3.org/2000/svg" width="13.39" height="13.39" viewBox="0 0 13.39 13.39"><path d="M18.69,18.69H5.31V5.31H18.69ZM17.39,6.61H6.61V17.39H17.39Z" transform="translate(-5.31 -5.31)"/></svg>'
        resizeButton.classList.remove('restore-button');
        resizeButton.classList.add('maximize-button');
        resizeButton.title = 'Maximize';
    }
}

/* Render Listeners */

// Maximize App
ipc.on('isMaximized', () => {
    changeResizeButton(true);
});

// Restore App
ipc.on('isRestored', () => {
    changeResizeButton(false);
});

/* HTML Listeners */

// Maximize Restore App Button
resizeButton.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp');
});
// Minimize App Button
minimizeButton.addEventListener('click', () => {
    ipc.send('minimizeApp');
});

// Close App Button
closeButton.addEventListener('click', () => {
    ipc.send('closeApp');
});

