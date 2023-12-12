// Création du script de préchargement
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
} )

/* Ajout de IPC
Note(issu du tutoriel):

Remarquez comment nous enveloppons l'appel ipcRenderer.invoke('ping') dans une fonction helper plutôt que d'exposer le module ipcRenderer directement via le contextBridge. Vous ne devez jamais exposer directement l’ensemble du module ipcRenderer via le préchargement. Cela donnerait à votre moteur de rendu la possibilité d'envoyer des messages IPC arbitraires au processus principal, représentant ainsi un vecteur d'attaque puissant pour du code malveillant.
*/