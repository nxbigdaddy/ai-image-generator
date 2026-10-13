const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

let mainWindow;

const API_KEY = YOUR_SECRET || '';
const BASE_URL = 'https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'AI 图片生成器',
    backgroundColor: '#1a1a2e',
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

async function generateImage(prompt, options = {}) {
  const response = await axios.post(
    `${BASE_URL}/images/generations`,
    {
      model: options.model || 'qwen-image-2.0',
      prompt: prompt,
      n: options.n || 1,
      size: options.size || '1024x1024',
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.data?.[0]?.url;
}

ipcMain.handle('generate-image', async (event, { prompt, model, size }) => {
  try {
    if (!API_KEY) {
      return { success: false, error: '请先在 .env 文件中配置 API Key' };
    }

    const imageUrl = await generateImage(prompt, { model, size });
    return { success: true, url: imageUrl };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
});

ipcMain.handle('save-image', async (event, imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const result = await dialog.showSaveDialog(mainWindow, {
      title: '保存图片',
      defaultPath: `generated-${Date.now()}.png`,
      filters: [
        { name: 'Images', extensions: ['png', 'jpg', 'jpeg'] },
      ],
    });

    if (!result.canceled && result.filePath) {
      fs.writeFileSync(result.filePath, Buffer.from(response.data));
      return { success: true, path: result.filePath };
    }
    return { success: false, error: '保存取消' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('check-api-key', () => {
  return { hasKey: !!API_KEY };
});
