const { app, BrowserWindow } = require("electron")
const path = require('node:path')

// Créer une fenêtre pour exécuter le programme
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // Les préférences web, un exemple d'utilisation des scripts de préchargement
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    

    win.loadFile('index.html')
}

// à utiliser pour lancer l'application
app.whenReady().then(() => {
    createWindow()
})

// Fermer l'application si toutes les fenêtres sont fermées
app.on('window-all-closed', () =>{
    if (process.platform !== 'darwin') app.quit()
})

// Cas des MacOS, et les fenêtres actives en arrière-plan
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
