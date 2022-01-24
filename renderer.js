// HTML Listeners 

// Maximize Restore App Button
windowResizeButton.addEventListener('click', () => {
    api.resizeWindow().then(data => {
        if (data) {
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
    });
});

// Minimize App Button
windowMinimizeButton.addEventListener('click', () => {
    api.minimizeWindow();
});

// Close App Button
windowCloseButton.addEventListener('click', () => {
    api.closeWindow();
});

// Home Button
sidebarHomeButton.addEventListener('click', () => {
    api.loadHome().then(data => {
        windowBodyContent.innerHTML = data;
    });
});

// Campaign Button
sidebarCampaignButton.addEventListener('click', () => {
    api.loadCampaign().then(data => {
        windowBodyContent.innerHTML = data;
    });
});

// Tasks Button
sidebarTasksButton.addEventListener('click', () => {
    api.loadTasks().then(data => {
        windowBodyContent.innerHTML = data;
    });
});

// Links Button
sidebarLinksButton.addEventListener('click', () => {
    api.loadLinks().then(data => {
        windowBodyContent.innerHTML = data;
    });
});

// Settings Button
appSettingsButton.addEventListener('click', () => {
    api.loadSettings().then(data => {
        windowBodyContent.innerHTML = data;
    });
});

// POE Lab Button
sidebarPOELabButton.addEventListener('click', () => {
    api.loadPOELab().then(data => {
        windowBodyContent.innerHTML = '';
    });
});

// POE Ninja Button
sidebarPOENinjaButton.addEventListener('click', () => {
    api.loadPOENinja().then(data => {
        windowBodyContent.innerHTML = '';
    });
});

// POE Antiquary Button
sidebarPOEAntiquaryButton.addEventListener('click', () => {
    api.loadPOEAntiquary().then(data => {
        windowBodyContent.innerHTML = '';
    });
});

// POE Wiki Button
sidebarPOEWikiButton.addEventListener('click', () => {
    api.loadPOEWiki().then(data => {
        windowBodyContent.innerHTML = '';
    });
});