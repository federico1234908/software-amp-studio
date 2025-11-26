import { Request, Response } from 'express';
import { Preset, PresetStorage } from '../services/storage';

// Get all presets
export const getPresets = async (req: Request, res: Response) => {
    try {
        const presets = await PresetStorage.getAllPresets();
        res.status(200).json(presets);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving presets', error });
    }
};

// Create a new preset
export const createPreset = async (req: Request, res: Response) => {
    const newPreset: Preset = req.body;
    try {
        const createdPreset = await PresetStorage.createPreset(newPreset);
        res.status(201).json(createdPreset);
    } catch (error) {
        res.status(500).json({ message: 'Error creating preset', error });
    }
};

// Delete a preset
export const deletePreset = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await PresetStorage.deletePreset(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting preset', error });
    }
};