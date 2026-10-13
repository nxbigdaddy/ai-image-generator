const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  generateImage: (data) => ipcRenderer.invoke('generate-image', data),
  saveImage: (imageUrl) => ipcRenderer.invoke('save-image', imageUrl),
  checkApiKey: () => ipcRenderer.invoke('check-api-key'),
});
