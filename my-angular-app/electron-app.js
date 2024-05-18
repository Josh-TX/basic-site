const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'electron-preload.js')
        }
    })
    win.webContents.openDevTools()
    win.loadFile('dist/browser/index.html')
}

app.whenReady().then(() => {
    createWindow()
    ipcMain.handle('ping', () => 'pong')
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})