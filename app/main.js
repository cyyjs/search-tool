// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut } = require('electron')
const Menu = require('./lib/menu')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

let mainWindow
const winurl = isDev
  ? 'http://localhost:8088'
  : 'file://' + path.join(__dirname, '../dist/index.html')
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    center: true,
    width: 600,
    height: 200,
    // resizable: false,
    minimizable: false,
    closable: false,
    transparent: true,
    vibrancy: 'appearance-based',
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.

  mainWindow.loadURL(winurl)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  if (isDev) {
    let installExtension = require('electron-devtools-installer')
    app.whenReady().then(() => {
      installExtension.default(installExtension.VUEJS_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    })
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    Menu.showEditor()
  })

  mainWindow.on('blur', () => {
    mainWindow.hide()
    app.dock.hide()
  })

  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
    mainWindow.show()
    mainWindow.focus()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
