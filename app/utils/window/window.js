const path = require("path");
const { BrowserWindow } = require("electron");

exports.createBrowserWindow = () => {
    return new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, "../../public/images/icons/window_controls/icon_app.png"),
        frame: false,
        backgroundColor: "#fff",
        webPreferences: {
            preload: path.join(__dirname, "../../../preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            devTools: true,
            nativeWindowOpen: true
        },
    });
};
