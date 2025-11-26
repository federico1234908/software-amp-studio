// SoundWave AmpStudio - Electron Preload Script
// Safely expose IPC to the renderer process

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // Preset management
    savePreset: (presetData) => ipcRenderer.invoke('save-preset-dialog', presetData),
    loadPreset: (callback) => ipcRenderer.on('load-preset', callback),

    // Audio export
    exportAudio: (audioData) => ipcRenderer.invoke('export-audio-dialog', audioData),

    // Menu commands
    onMenuCommand: (channel, callback) => {
        const validChannels = [
            'menu-new-preset',
            'menu-save-preset',
            'menu-export-audio',
            'menu-start-audio',
            'menu-stop-audio',
            'menu-audio-settings',
            'menu-open-tuner',
            'menu-open-metronome',
            'menu-open-looper',
            'menu-open-recorder'
        ];

        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, callback);
        }
    },

    // Remove listeners
    removeListener: (channel, callback) => {
        ipcRenderer.removeListener(channel, callback);
    },

    // Platform info
    platform: process.platform,
    isElectron: true,
    version: process.versions.electron
});

console.log('SoundWave AmpStudio - Preload script loaded');
console.log('Electron version:', process.versions.electron);
console.log('Platform:', process.platform);
