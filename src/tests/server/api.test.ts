import request from 'supertest';
import app from '../../server/index'; // Adjust the import based on your server setup

describe('API Routes', () => {
  it('should return a list of presets', async () => {
    const response = await request(app).get('/api/presets');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new preset', async () => {
    const newPreset = { name: 'Test Preset', settings: {} };
    const response = await request(app).post('/api/presets').send(newPreset);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newPreset.name);
  });

  it('should return a specific preset', async () => {
    const presetId = '1'; // Replace with a valid preset ID
    const response = await request(app).get(`/api/presets/${presetId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(presetId);
  });

  it('should update a preset', async () => {
    const presetId = '1'; // Replace with a valid preset ID
    const updatedPreset = { name: 'Updated Preset', settings: {} };
    const response = await request(app).put(`/api/presets/${presetId}`).send(updatedPreset);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedPreset.name);
  });

  it('should delete a preset', async () => {
    const presetId = '1'; // Replace with a valid preset ID
    const response = await request(app).delete(`/api/presets/${presetId}`);
    expect(response.status).toBe(204);
  });
});