const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;


function changeWindowResizeButton(fullscreen) {
    if (fullscreen) {
        windowResizeButton.innerHTML = '<svg class="window-button-svg" xmlns="http://www.w3.org/2000/svg" width="13.35" height="13.35" viewBox="0 0 13.35 13.35"><path d="M7.35,7.35v-2H18.68V16.65h-2v2H5.32V7.35Zm1.11,0h8.19v8.19h.92V6.43H8.46Zm7.08,1.11H6.43v9.11h9.11Z" transform="translate(-5.32 -5.32)"/></svg>'
        windowResizeButton.classList.remove('maximize-button');
        windowResizeButton.classList.add('restore-button');
        windowResizeButton.title = 'Restore';
    } else {
        windowResizeButton.innerHTML = '<svg class="window-button-svg" xmlns="http://www.w3.org/2000/svg" width="13.39" height="13.39" viewBox="0 0 13.39 13.39"><path d="M18.69,18.69H5.31V5.31H18.69ZM17.39,6.61H6.61V17.39H17.39Z" transform="translate(-5.31 -5.31)"/></svg>'
        windowResizeButton.classList.remove('restore-button');
        windowResizeButton.classList.add('maximize-button');
        windowResizeButton.title = 'Maximize';
    }
}

// Resize Webviews
function calculateLayoutSize() {    
    const titlebar = document.getElementById("windowTitlebar");
    const sidebar = document.getElementById("windowSidebar");
    const titlebarHeight = titlebar.clientHeight;
    const sidebarWidth = sidebar.clientWidth;
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    const webviewHeight = windowHeight - titlebarHeight;
    const webviewWidth = windowWidth - sidebarWidth;
    const webview = document.getElementById("webview");

    webview.style.width = webviewWidth + "px";
    webview.style.height = webviewHeight + "px";
}

window.onload = () => {
    calculateLayoutSize();
}

window.onresize = () => {
    calculateLayoutSize();
}


/* Render Listeners */

// Maximize App
ipc.on('windowFullscreen', () => {
    changeWindowResizeButton(true);
});

// Restore App
ipc.on('windowRestore', () => {
    changeWindowResizeButton(false);
});

/* HTML Listeners */

// Maximize Restore App Button
windowResizeButton.addEventListener('click', () => {
    ipc.send('windowResize');
});

// Minimize App Button
windowMinimizeButton.addEventListener('click', () => {
    ipc.send('windowMinimize');
});

// Close App Button
windowCloseButton.addEventListener('click', () => {
    ipc.send('windowClose');
});

// Home Button
sidebarHomeButton.addEventListener('click', () => {
    ipc.send('contentHome');
});

// Campaign Button
sidebarCampaignButton.addEventListener('click', () => {
    ipc.send('contentCampaign');
});

// POE Lab Button
sidebarPOELabButton.addEventListener('click', () => {
    ipc.send('contentLab');
});

// POE Ninja Button
sidebarPOENinjaButton.addEventListener('click', () => {
    ipc.send('contentNinja');
});

// POE Antiquary Button
sidebarPOEAntiquaryButton.addEventListener('click', () => {
    ipc.send('contentAntiquary');
});

// POE Wiki Button
sidebarPOEWikiButton.addEventListener('click', () => {
    ipc.send('contentWiki');
});

// Tasks Button
sidebarTasksButton.addEventListener('click', () => {
    ipc.send('contentTasks');
});

// Links Button
sidebarLinksButton.addEventListener('click', () => {
    ipc.send('contentLinks');
});

// Settings Button
appSettingsButton.addEventListener('click', () => {
    ipc.send('contentSettings');
});
