// HTML Listeners 

// Maximize Restore App Button
windowResizeButton.addEventListener('click', () => {
    api.windowControls.resizeWindow().then(data => {
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
    api.windowControls.minimizeWindow();
});

// Close App Button
windowCloseButton.addEventListener('click', () => {
    api.windowControls.closeWindow();
});

// Home Button
sidebarHomeButton.addEventListener('click', () => {
    api.navigation.loadHome().then(data => {
        windowBodyContent.innerHTML = data;
    });
});

// Campaign Button
sidebarCampaignButton.addEventListener('click', () => {
    windowBodyContent.innerHTML = '';
    api.navigation.loadCampaign().then(data => {
        windowBodyContent.innerHTML = data;
    });
});

// Tasks Button
sidebarTasksButton.addEventListener('click', () => {
    api.navigation.loadTasks().then(data => {
        windowBodyContent.innerHTML = data;
    });
});

// Links Button
sidebarLinksButton.addEventListener('click', () => {
    api.navigation.loadLinks().then(data => {
        windowBodyContent.innerHTML = data;
    });
});

// Settings Button
appSettingsButton.addEventListener('click', () => {
    api.navigation.loadSettings().then(data => {
        windowBodyContent.innerHTML = data;
    });
});

// POE Lab Button
sidebarPOELabButton.addEventListener('click', () => {
    api.navigation.loadPOELab().then(data => {
        windowBodyContent.innerHTML = '';
    });
});

// POE Ninja Button
sidebarPOENinjaButton.addEventListener('click', () => {
    api.navigation.loadPOENinja().then(data => {
        windowBodyContent.innerHTML = '';
    });
});

// POE Antiquary Button
sidebarPOEAntiquaryButton.addEventListener('click', () => {
    api.navigation.loadPOEAntiquary().then(data => {
        windowBodyContent.innerHTML = '';
    });
});

// POE Wiki Button
sidebarPOEWikiButton.addEventListener('click', () => {
    api.navigation.loadPOEWiki().then(data => {
        windowBodyContent.innerHTML = '';
    });
});
