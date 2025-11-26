import fs from 'fs';
import path from 'path';

const storageFilePath = path.join(__dirname, 'presets.json');

export const savePreset = (preset) => {
    const presets = getPresets();
    presets.push(preset);
    fs.writeFileSync(storageFilePath, JSON.stringify(presets, null, 2));
};

export const getPresets = () => {
    if (!fs.existsSync(storageFilePath)) {
        return [];
    }
    const data = fs.readFileSync(storageFilePath, 'utf-8');
    return JSON.parse(data);
};

export const deletePreset = (presetId) => {
    const presets = getPresets();
    const updatedPresets = presets.filter(preset => preset.id !== presetId);
    fs.writeFileSync(storageFilePath, JSON.stringify(updatedPresets, null, 2));
};