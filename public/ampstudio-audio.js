// SoundWave AmpStudio - Audio Engine
// Professional Guitar Amp Simulator with Web Audio API

class AmpStudioAudio {
    constructor() {
        this.audioContext = null;
        this.inputNode = null;
        this.outputNode = null;
        this.analyserNode = null;
        this.gainNode = null;

        // Audio chain nodes
        this.preampGain = null;
        this.toneStack = {
            bass: null,
            mid: null,
            treble: null,
            presence: null
        };
        this.distortion = null;
        this.cabinet = null;

        // Effects chain
        this.effects = [];

        // State
        this.isRunning = false;
        this.latency = 0;

        // Presets
        this.presets = {
            clean: { gain: 10, bass: 60, mid: 50, treble: 55, presence: 45, volume: 70 },
            crunch: { gain: 45, bass: 55, mid: 60, treble: 50, presence: 55, volume: 65 },
            lead: { gain: 75, bass: 45, mid: 70, treble: 65, presence: 70, volume: 70 },
            metal: { gain: 90, bass: 60, mid: 40, treble: 70, presence: 80, volume: 75 },
            blues: { gain: 35, bass: 65, mid: 55, treble: 48, presence: 50, volume: 68 }
        };

        // Tuner
        this.tunerBuffer = [];
        this.tunerCallback = null;
    }

    async initialize() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                latencyHint: 'interactive',
                sampleRate: 48000
            });

            // Create audio nodes
            this.createAudioChain();

            console.log('Audio context initialized:', this.audioContext);
            console.log('Sample rate:', this.audioContext.sampleRate);
            console.log('Base latency:', this.audioContext.baseLatency);

            return true;
        } catch (error) {
            console.error('Failed to initialize audio:', error);
            return false;
        }
    }

    createAudioChain() {
        // Input gain (preamp)
        this.preampGain = this.audioContext.createGain();
        this.preampGain.gain.value = 1.0;

        // Distortion (waveshaper)
        this.distortion = this.audioContext.createWaveShaper();
        this.distortion.curve = this.makeDistortionCurve(0);
        this.distortion.oversample = '4x';

        // Tone stack (EQ filters)
        this.toneStack.bass = this.audioContext.createBiquadFilter();
        this.toneStack.bass.type = 'lowshelf';
        this.toneStack.bass.frequency.value = 100;
        this.toneStack.bass.gain.value = 0;

        this.toneStack.mid = this.audioContext.createBiquadFilter();
        this.toneStack.mid.type = 'peaking';
        this.toneStack.mid.frequency.value = 1000;
        this.toneStack.mid.Q.value = 0.7;
        this.toneStack.mid.gain.value = 0;

        this.toneStack.treble = this.audioContext.createBiquadFilter();
        this.toneStack.treble.type = 'highshelf';
        this.toneStack.treble.frequency.value = 3000;
        this.toneStack.treble.gain.value = 0;

        this.toneStack.presence = this.audioContext.createBiquadFilter();
        this.toneStack.presence.type = 'peaking';
        this.toneStack.presence.frequency.value = 5000;
        this.toneStack.presence.Q.value = 1.4;
        this.toneStack.presence.gain.value = 0;

        // Cabinet simulation (lowpass filter)
        this.cabinet = this.audioContext.createBiquadFilter();
        this.cabinet.type = 'lowpass';
        this.cabinet.frequency.value = 5000;
        this.cabinet.Q.value = 0.707;

        // Output gain
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = 0.7;

        // Analyser for visualization
        this.analyserNode = this.audioContext.createAnalyser();
        this.analyserNode.fftSize = 2048;
        this.analyserNode.smoothingTimeConstant = 0.8;

        // Output
        this.outputNode = this.audioContext.destination;

        console.log('Audio chain created');
    }

    async start() {
        if (this.isRunning) {
            console.log('Audio already running');
            return;
        }

        try {
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                    latency: 0
                }
            });

            // Create input from microphone
            this.inputNode = this.audioContext.createMediaStreamSource(stream);

            // Connect the audio chain
            this.connectChain();

            this.isRunning = true;
            this.latency = this.calculateLatency();

            console.log('Audio started, latency:', this.latency + 'ms');

            return true;
        } catch (error) {
            console.error('Failed to start audio:', error);
            alert('Could not access microphone. Please check permissions.');
            return false;
        }
    }

    stop() {
        if (!this.isRunning) return;

        // Disconnect everything
        if (this.inputNode) {
            this.inputNode.disconnect();
            this.inputNode = null;
        }

        this.isRunning = false;
        console.log('Audio stopped');
    }

    connectChain() {
        // Connect the signal chain:
        // Input -> Preamp -> Distortion -> Tone Stack -> Cabinet -> Output Gain -> Analyser -> Output

        this.inputNode
            .connect(this.preampGain)
            .connect(this.distortion)
            .connect(this.toneStack.bass)
            .connect(this.toneStack.mid)
            .connect(this.toneStack.treble)
            .connect(this.toneStack.presence)
            .connect(this.cabinet)
            .connect(this.gainNode)
            .connect(this.analyserNode)
            .connect(this.outputNode);
    }

    // Distortion curve generation
    makeDistortionCurve(amount) {
        const k = typeof amount === 'number' ? amount : 50;
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;

        for (let i = 0; i < n_samples; i++) {
            const x = (i * 2) / n_samples - 1;
            curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
        }

        return curve;
    }

    // Parameter setters
    setGain(value) {
        // value 0-100
        const gain = 1 + (value / 100) * 4; // 1x to 5x
        this.preampGain.gain.value = gain;

        // Update distortion curve
        const distAmount = (value / 100) * 400; // 0 to 400
        this.distortion.curve = this.makeDistortionCurve(distAmount);
    }

    setBass(value) {
        // value 0-100
        const gain = ((value - 50) / 50) * 12; // -12dB to +12dB
        this.toneStack.bass.gain.value = gain;
    }

    setMid(value) {
        const gain = ((value - 50) / 50) * 12;
        this.toneStack.mid.gain.value = gain;
    }

    setTreble(value) {
        const gain = ((value - 50) / 50) * 12;
        this.toneStack.treble.gain.value = gain;
    }

    setPresence(value) {
        const gain = ((value - 50) / 50) * 10;
        this.toneStack.presence.gain.value = gain;
    }

    setVolume(value) {
        // value 0-100
        this.gainNode.gain.value = value / 100;
    }

    setMasterVolume(value) {
        // value 0-100
        const volume = (value / 100) * 1.2; // Allow slight boost
        if (this.gainNode) {
            this.gainNode.gain.value = volume;
        }
    }

    setCabinetFilter(frequency) {
        this.cabinet.frequency.value = frequency;
    }

    // Preset management
    loadPreset(presetName) {
        const preset = this.presets[presetName];
        if (!preset) {
            console.error('Preset not found:', presetName);
            return null;
        }

        return preset;
    }

    saveCustomPreset(name, params) {
        this.presets[name] = params;
        console.log('Preset saved:', name);
    }

    // Analyser data for visualization
    getWaveformData() {
        if (!this.analyserNode) return null;

        const bufferLength = this.analyserNode.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        this.analyserNode.getByteTimeDomainData(dataArray);

        return dataArray;
    }

    getFrequencyData() {
        if (!this.analyserNode) return null;

        const bufferLength = this.analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyserNode.getByteFrequencyData(dataArray);

        return dataArray;
    }

    getInputLevel() {
        const data = this.getWaveformData();
        if (!data) return 0;

        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            const normalized = (data[i] - 128) / 128;
            sum += normalized * normalized;
        }

        const rms = Math.sqrt(sum / data.length);
        return rms;
    }

    getOutputLevel() {
        const data = this.getFrequencyData();
        if (!data) return 0;

        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            sum += data[i];
        }

        return (sum / data.length) / 256;
    }

    // Tuner functionality
    startTuner(callback) {
        this.tunerCallback = callback;
        this.tunerUpdate();
    }

    stopTuner() {
        this.tunerCallback = null;
    }

    tunerUpdate() {
        if (!this.tunerCallback || !this.isRunning) return;

        const data = this.getWaveformData();
        if (data) {
            const frequency = this.autoCorrelate(data, this.audioContext.sampleRate);

            if (frequency > 0) {
                const note = this.frequencyToNote(frequency);
                this.tunerCallback(note, frequency);
            }
        }

        requestAnimationFrame(() => this.tunerUpdate());
    }

    autoCorrelate(buffer, sampleRate) {
        // Simple autocorrelation for pitch detection
        const SIZE = buffer.length;
        const MAX_SAMPLES = Math.floor(SIZE / 2);
        let best_offset = -1;
        let best_correlation = 0;
        let rms = 0;

        for (let i = 0; i < SIZE; i++) {
            const val = (buffer[i] - 128) / 128;
            rms += val * val;
        }

        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.01) return -1; // Signal too quiet

        let lastCorrelation = 1;
        for (let offset = 1; offset < MAX_SAMPLES; offset++) {
            let correlation = 0;

            for (let i = 0; i < MAX_SAMPLES; i++) {
                correlation += Math.abs(((buffer[i] - 128) / 128) - ((buffer[i + offset] - 128) / 128));
            }

            correlation = 1 - (correlation / MAX_SAMPLES);

            if (correlation > 0.9 && correlation > lastCorrelation) {
                const foundGoodCorrelation = true;
                if (foundGoodCorrelation && correlation > best_correlation) {
                    best_correlation = correlation;
                    best_offset = offset;
                }
            }

            lastCorrelation = correlation;
        }

        if (best_correlation > 0.01) {
            return sampleRate / best_offset;
        }

        return -1;
    }

    frequencyToNote(frequency) {
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const A4 = 440;
        const C0 = A4 * Math.pow(2, -4.75);

        if (frequency < 20 || frequency > 4000) return { name: '--', cents: 0, octave: 0 };

        const h = 12 * Math.log2(frequency / C0);
        const octave = Math.floor(h / 12);
        const n = Math.round(h) % 12;
        const cents = Math.floor((h - Math.round(h)) * 100);

        return {
            name: noteNames[n],
            cents: cents,
            octave: octave,
            frequency: frequency.toFixed(1)
        };
    }

    calculateLatency() {
        if (!this.audioContext) return 0;

        const baseLatency = this.audioContext.baseLatency || 0;
        const outputLatency = this.audioContext.outputLatency || 0;
        const total = (baseLatency + outputLatency) * 1000;

        return Math.round(total * 10) / 10;
    }
}

// Create global instance
window.ampStudio = new AmpStudioAudio();

console.log('SoundWave AmpStudio Audio Engine loaded');
