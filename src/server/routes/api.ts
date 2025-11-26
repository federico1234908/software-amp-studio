import express from 'express';
import { getPresets, createPreset, deletePreset } from '../controllers/presets';

const router = express.Router();

// Route to get all presets
router.get('/presets', getPresets);

// Route to create a new preset
router.post('/presets', createPreset);

// Route to delete a preset by ID
router.delete('/presets/:id', deletePreset);

export default router;