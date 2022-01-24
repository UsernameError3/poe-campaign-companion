const electron = require("electron");
const { BrowserView} = electron;

// Assigns BrowserView to Provided Window
const assignBrowserView = (currentWindow, browserView) => {
    try {
        currentWindow.setBrowserView(browserView);
    } catch (error) {
        console.log('BrowserView Assign Failed.', error);
    }
};

// Replaces Existing BrowserView with Provided BrowserView on Provided Window
const replaceBrowserView = (currentWindow, newBrowserView) => {
    try {
        const currentView = currentWindow.getBrowserView();
        currentWindow.removeBrowserView(currentView);
        currentWindow.setBrowserView(newBrowserView);
    } catch (error) {
        console.log('BrowserView Removal Failed.', error);
    }
};

// Resizes Existing BrowserView on Provided Window
const resizeBrowserView = (currentWindow, windowOffsetX, windowOffsetY) => {
    try {
        const currentView = currentWindow.getBrowserView();
        const windowSize = currentWindow.getSize();
        const windowWidth = windowSize[0];
        const windowHeight = windowSize[1];
        currentView.setBounds({ x: windowOffsetX, y: windowOffsetY, width: windowWidth, height: windowHeight });
    } catch (error) {
        console.log('BrowserView Resize Failed.', error);
    }
};

// Load BrowserView Determines whether to Replace or to Assign, with Resize on Provided Window.
exports.detachBrowserView = (currentWindow) => {
    const currentView = currentWindow.getBrowserView();
    currentWindow.removeBrowserView(currentView);
};

// Load BrowserView Determines whether to Replace or to Assign, with Resize on Provided Window.
exports.loadBrowserView = (currentWindow, newBrowserView, windowOffsetX, windowOffsetY) => {
    if (currentWindow.getBrowserView()) {
        replaceBrowserView(currentWindow, newBrowserView);
        resizeBrowserView(currentWindow, windowOffsetX, windowOffsetY);
    } else {
        assignBrowserView(currentWindow, newBrowserView);
        resizeBrowserView(currentWindow, windowOffsetX, windowOffsetY);
    }
};

// Creating a New Window also Assigns the Window
exports.createBrowserView = (browserViewURL, currentWindow, windowOffsetX, windowOffsetY) => {
    const view = new BrowserView();
    view.setAutoResize({ width: true, height: true });
    view.webContents.loadURL(browserViewURL);
    assignBrowserView(currentWindow, view);
    resizeBrowserView(currentWindow, windowOffsetX, windowOffsetY);
    return view;
};
