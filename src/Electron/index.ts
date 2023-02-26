import electron, { app, BrowserWindow } from "electron";
import { instanceServices } from "./services";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    show: false,
    width: width,
    height: height,
    minWidth: 1000,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  // and load the index.html of the app.

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app
  .on("ready", createWindow)
  .whenReady()
  .then(instanceServices)
  .catch(() => app.quit());

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
