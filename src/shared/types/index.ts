export type AmplifierPreset = {
  id: string;
  name: string;
  settings: {
    gain: number;
    bass: number;
    mid: number;
    treble: number;
    volume: number;
  };
};

export type AudioSettings = {
  inputDeviceId: string;
  outputDeviceId: string;
  sampleRate: number;
};

export type User = {
  id: string;
  username: string;
  email: string;
};