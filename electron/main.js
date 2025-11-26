// SoundWave AmpStudio - Electron Main Process
// Desktop application wrapper for the web-based amp simulator

const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference of the window object
let mainWindow;

// Disable GPU acceleration for better compatibility
app.disableHardwareAcceleration();

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        backgroundColor: '#1A1A2E',
        icon: path.join(__dirname, '../public/icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            enableRemoteModule: false,
            webSecurity: true
        },
        show: false, // Don't show until ready
        frame: true,
        titleBarStyle: 'default'
    });

    // Load the app
    const startUrl = path.join(__dirname, '../public/ampstudio.html');
    mainWindow.loadFile(startUrl);

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        // Open DevTools in development mode
        if (process.env.NODE_ENV === 'development') {
            mainWindow.webContents.openDevTools();
        }
    });

    // Create application menu
    createMenu();

    // Handle window close
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        require('electron').shell.openExternal(url);
        return { action: 'deny' };
    });
}

function createMenu() {
    const isMac = process.platform === 'darwin';

    const template = [
        // App Menu (macOS)
        ...(isMac ? [{
            label: app.name,
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        }] : []),

        // File Menu
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Preset',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.webContents.send('menu-new-preset');
                    }
                },
                {
                    label: 'Open Preset...',
                    accelerator: 'CmdOrCtrl+O',
                    click: async () => {
                        const result = await dialog.showOpenDialog(mainWindow, {
                            properties: ['openFile'],
                            filters: [
                                { name: 'Preset Files', extensions: ['swpreset', 'json'] },
                                { name: 'All Files', extensions: ['*'] }
                            ]
                        });

                        if (!result.canceled && result.filePaths.length > 0) {
                            const presetPath = result.filePaths[0];
                            const presetData = fs.readFileSync(presetPath, 'utf8');
                            mainWindow.webContents.send('load-preset', presetData);
                        }
                    }
                },
                {
                    label: 'Save Preset...',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        mainWindow.webContents.send('menu-save-preset');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Export Audio...',
                    accelerator: 'CmdOrCtrl+E',
                    click: () => {
                        mainWindow.webContents.send('menu-export-audio');
                    }
                },
                { type: 'separator' },
                isMac ? { role: 'close' } : { role: 'quit' }
            ]
        },

        // Edit Menu
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac ? [
                    { role: 'pasteAndMatchStyle' },
                    { role: 'delete' },
                    { role: 'selectAll' }
                ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ])
            ]
        },

        // View Menu
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },

        // Audio Menu
        {
            label: 'Audio',
            submenu: [
                {
                    label: 'Start Audio',
                    accelerator: 'CmdOrCtrl+Space',
                    click: () => {
                        mainWindow.webContents.send('menu-start-audio');
                    }
                },
                {
                    label: 'Stop Audio',
                    accelerator: 'CmdOrCtrl+Shift+Space',
                    click: () => {
                        mainWindow.webContents.send('menu-stop-audio');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Audio Settings...',
                    accelerator: 'CmdOrCtrl+,',
                    click: () => {
                        mainWindow.webContents.send('menu-audio-settings');
                    }
                }
            ]
        },

        // Tools Menu
        {
            label: 'Tools',
            submenu: [
                {
                    label: 'Tuner',
                    accelerator: 'CmdOrCtrl+T',
                    click: () => {
                        mainWindow.webContents.send('menu-open-tuner');
                    }
                },
                {
                    label: 'Metronome',
                    accelerator: 'CmdOrCtrl+M',
                    click: () => {
                        mainWindow.webContents.send('menu-open-metronome');
                    }
                },
                {
                    label: 'Looper',
                    accelerator: 'CmdOrCtrl+L',
                    click: () => {
                        mainWindow.webContents.send('menu-open-looper');
                    }
                },
                {
                    label: 'Recorder',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        mainWindow.webContents.send('menu-open-recorder');
                    }
                }
            ]
        },

        // Help Menu
        {
            role: 'help',
            submenu: [
                {
                    label: 'Documentation',
                    click: async () => {
                        const { shell } = require('electron');
                        await shell.openExternal('https://github.com/soundwave-amplifiers/ampstudio/wiki');
                    }
                },
                {
                    label: 'Report Issue',
                    click: async () => {
                        const { shell } = require('electron');
                        await shell.openExternal('https://github.com/soundwave-amplifiers/ampstudio/issues');
                    }
                },
                { type: 'separator' },
                {
                    label: 'About SoundWave AmpStudio',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'About SoundWave AmpStudio',
                            message: 'SoundWave AmpStudio',
                            detail: `Version: ${app.getVersion()}\n\nA professional guitar amplifier simulator.\n\n100% Free & Open Source\n\nCopyright © 2024 SoundWave Amplifiers`,
                            buttons: ['OK']
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Handle save preset from renderer
ipcMain.handle('save-preset-dialog', async (event, presetData) => {
    const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Save Preset',
        defaultPath: 'my-preset.swpreset',
        filters: [
            { name: 'SoundWave Preset', extensions: ['swpreset'] },
            { name: 'JSON', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });

    if (!result.canceled && result.filePath) {
        try {
            fs.writeFileSync(result.filePath, presetData, 'utf8');
            return { success: true, path: result.filePath };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    return { success: false, canceled: true };
});

// Handle export audio from renderer
ipcMain.handle('export-audio-dialog', async (event, audioData) => {
    const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Export Audio',
        defaultPath: 'recording.wav',
        filters: [
            { name: 'WAV Audio', extensions: ['wav'] },
            { name: 'MP3 Audio', extensions: ['mp3'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });

    if (!result.canceled && result.filePath) {
        try {
            // Audio data should be a buffer
            fs.writeFileSync(result.filePath, audioData);
            return { success: true, path: result.filePath };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    return { success: false, canceled: true };
});

// App lifecycle
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS, re-create window when dock icon is clicked
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
    // On macOS, apps stay active until user quits explicitly
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Handle app errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);

    dialog.showErrorBox(
        'Application Error',
        `An unexpected error occurred:\n\n${error.message}\n\nThe application may need to restart.`
    );
});

console.log('SoundWave AmpStudio Desktop - Started');
console.log('Platform:', process.platform);
console.log('Version:', app.getVersion());
