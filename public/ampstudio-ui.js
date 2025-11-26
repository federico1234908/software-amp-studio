// SoundWave AmpStudio - UI Controller
// Handles all user interface interactions and visualizations

class AmpStudioUI {
    constructor() {
        this.visualizer = null;
        this.visualizerMode = 'waveform';
        this.animationId = null;

        // Knob interaction
        this.activeKnob = null;
        this.knobStartY = 0;
        this.knobStartValue = 0;

        // Tools state
        this.toolsOpen = {
            tuner: false,
            metronome: false,
            looper: false,
            recorder: false
        };

        // Metronome
        this.metronomeInterval = null;
        this.metronomeBeat = 0;

        this.init();
    }

    init() {
        // Initialize audio engine
        this.initializeAudio();

        // Setup event listeners
        this.setupAudioControls();
        this.setupKnobs();
        this.setupPresets();
        this.setupTools();
        this.setupVisualizer();
        this.setupSettings();
        this.setupMeters();

        console.log('SoundWave AmpStudio UI initialized');
    }

    async initializeAudio() {
        const initialized = await window.ampStudio.initialize();

        if (initialized) {
            document.getElementById('audioStatus').textContent = 'Audio: Ready';
            document.getElementById('audioStatus').classList.remove('status-disconnected');
            document.getElementById('audioStatus').classList.add('status-connected');
        }
    }

    setupAudioControls() {
        const startBtn = document.getElementById('startAudioBtn');
        const stopBtn = document.getElementById('stopAudioBtn');

        startBtn.addEventListener('click', async () => {
            const started = await window.ampStudio.start();

            if (started) {
                startBtn.disabled = true;
                stopBtn.disabled = false;
                document.getElementById('audioStatus').textContent = 'Audio: Active';
                this.startVisualizer();
                this.updateLatencyDisplay();
            }
        });

        stopBtn.addEventListener('click', () => {
            window.ampStudio.stop();
            startBtn.disabled = false;
            stopBtn.disabled = true;
            document.getElementById('audioStatus').textContent = 'Audio: Stopped';
            document.getElementById('audioStatus').classList.remove('status-connected');
            document.getElementById('audioStatus').classList.add('status-disconnected');
            this.stopVisualizer();
        });
    }

    setupKnobs() {
        const knobs = document.querySelectorAll('.knob');
        const paramMap = {
            gain: { setter: 'setGain', display: 'gainValue', initial: 50 },
            bass: { setter: 'setBass', display: 'bassValue', initial: 50 },
            mid: { setter: 'setMid', display: 'midValue', initial: 50 },
            treble: { setter: 'setTreble', display: 'trebleValue', initial: 50 },
            presence: { setter: 'setPresence', display: 'presenceValue', initial: 50 },
            volume: { setter: 'setVolume', display: 'volumeValue', initial: 70 }
        };

        knobs.forEach(knob => {
            const param = knob.dataset.param;
            const config = paramMap[param];

            if (!config) return;

            let currentValue = config.initial;

            knob.addEventListener('mousedown', (e) => {
                this.activeKnob = { element: knob, param, config, value: currentValue };
                this.knobStartY = e.clientY;
                this.knobStartValue = currentValue;
                knob.style.cursor = 'grabbing';
                e.preventDefault();
            });

            // Initialize knob position
            this.updateKnobPosition(knob, currentValue);
            document.getElementById(config.display).textContent = Math.round(currentValue);

            // Set initial audio value
            if (window.ampStudio[config.setter]) {
                window.ampStudio[config.setter](currentValue);
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.activeKnob) return;

            const delta = this.knobStartY - e.clientY;
            let newValue = this.knobStartValue + delta * 0.5;
            newValue = Math.max(0, Math.min(100, newValue));

            this.activeKnob.value = newValue;
            this.updateKnobPosition(this.activeKnob.element, newValue);
            document.getElementById(this.activeKnob.config.display).textContent = Math.round(newValue);

            // Update audio
            if (window.ampStudio[this.activeKnob.config.setter]) {
                window.ampStudio[this.activeKnob.config.setter](newValue);
            }
        });

        document.addEventListener('mouseup', () => {
            if (this.activeKnob) {
                this.activeKnob.element.style.cursor = 'pointer';
                this.activeKnob = null;
            }
        });
    }

    updateKnobPosition(knob, value) {
        const indicator = knob.querySelector('.knob-indicator');
        const degrees = -135 + (value / 100) * 270; // -135° to +135°
        knob.style.transform = `rotate(${degrees}deg)`;
    }

    setupPresets() {
        const presetSelect = document.getElementById('presetSelect');
        const saveBtn = document.getElementById('savePresetBtn');
        const shareBtn = document.getElementById('sharePresetBtn');

        presetSelect.addEventListener('change', (e) => {
            const presetName = e.target.value;
            if (!presetName) return;

            const preset = window.ampStudio.loadPreset(presetName);
            if (preset) {
                this.applyPreset(preset);
            }
        });

        saveBtn.addEventListener('click', () => {
            const name = prompt('Enter preset name:');
            if (name) {
                const currentParams = this.getCurrentParams();
                window.ampStudio.saveCustomPreset(name, currentParams);
                alert('Preset saved: ' + name);
            }
        });

        shareBtn.addEventListener('click', () => {
            const params = this.getCurrentParams();
            const json = JSON.stringify(params);
            const encoded = btoa(json);
            const url = window.location.origin + window.location.pathname + '?preset=' + encoded;

            navigator.clipboard.writeText(url).then(() => {
                alert('Preset URL copied to clipboard!');
            });
        });
    }

    applyPreset(preset) {
        Object.keys(preset).forEach(param => {
            const value = preset[param];
            const setter = 'set' + param.charAt(0).toUpperCase() + param.slice(1);

            if (window.ampStudio[setter]) {
                window.ampStudio[setter](value);
            }

            // Update UI
            const knob = document.querySelector(`[data-param="${param}"]`);
            if (knob) {
                this.updateKnobPosition(knob, value);
                const displayId = param + 'Value';
                const display = document.getElementById(displayId);
                if (display) {
                    display.textContent = Math.round(value);
                }
            }
        });
    }

    getCurrentParams() {
        const knobs = document.querySelectorAll('.knob');
        const params = {};

        knobs.forEach(knob => {
            const param = knob.dataset.param;
            const value = parseFloat(document.getElementById(param + 'Value').textContent);
            params[param] = value;
        });

        return params;
    }

    setupTools() {
        const toolBtns = document.querySelectorAll('.tool-btn');

        toolBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tool = btn.dataset.tool;
                this.toggleTool(tool);
            });
        });

        // Close buttons
        document.querySelectorAll('.tool-panel .close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const panel = e.target.closest('.tool-panel');
                panel.classList.add('hidden');
            });
        });

        // Tuner
        this.setupTuner();

        // Metronome
        this.setupMetronome();
    }

    toggleTool(toolName) {
        const panel = document.getElementById(toolName + 'Panel');
        if (!panel) return;

        const isHidden = panel.classList.contains('hidden');

        if (isHidden) {
            panel.classList.remove('hidden');
            this.toolsOpen[toolName] = true;

            // Start tool-specific functionality
            if (toolName === 'tuner') {
                this.startTuner();
            }
        } else {
            panel.classList.add('hidden');
            this.toolsOpen[toolName] = false;

            // Stop tool-specific functionality
            if (toolName === 'tuner') {
                this.stopTuner();
            }
        }
    }

    setupTuner() {
        // Tuner is controlled by toggle
    }

    startTuner() {
        window.ampStudio.startTuner((note, frequency) => {
            const noteDisplay = document.querySelector('.note-display');
            const centsDisplay = document.querySelector('.cents-display');
            const freqDisplay = document.querySelector('.frequency-display');
            const needle = document.querySelector('.tuner-needle');

            noteDisplay.textContent = note.name + note.octave;
            centsDisplay.textContent = (note.cents >= 0 ? '+' : '') + note.cents + ' cents';
            freqDisplay.textContent = note.frequency + ' Hz';

            // Move needle based on cents (-50 to +50)
            const needlePos = 50 + (note.cents / 50) * 40; // Center ± 40%
            needle.style.left = needlePos + '%';

            // Color coding
            if (Math.abs(note.cents) < 5) {
                needle.style.background = 'var(--success)';
            } else if (Math.abs(note.cents) < 15) {
                needle.style.background = 'var(--warning)';
            } else {
                needle.style.background = 'var(--danger)';
            }
        });
    }

    stopTuner() {
        window.ampStudio.stopTuner();
    }

    setupMetronome() {
        const bpmInput = document.getElementById('metronomeBPM');
        const bpmSlider = document.getElementById('metronomeBPMSlider');
        const startBtn = document.getElementById('metronomeStartBtn');
        const stopBtn = document.getElementById('metronomeStopBtn');

        bpmInput.addEventListener('input', (e) => {
            bpmSlider.value = e.target.value;
        });

        bpmSlider.addEventListener('input', (e) => {
            bpmInput.value = e.target.value;
        });

        startBtn.addEventListener('click', () => {
            this.startMetronome(parseInt(bpmInput.value));
        });

        stopBtn.addEventListener('click', () => {
            this.stopMetronome();
        });
    }

    startMetronome(bpm) {
        const interval = 60000 / bpm; // ms per beat
        this.metronomeBeat = 0;

        const indicators = document.querySelectorAll('.beat-indicator');

        this.metronomeInterval = setInterval(() => {
            // Remove active from all
            indicators.forEach(ind => ind.classList.remove('active'));

            // Add active to current beat
            indicators[this.metronomeBeat].classList.add('active');

            // Play click sound (simple beep)
            this.playMetronomeClick(this.metronomeBeat === 0);

            this.metronomeBeat = (this.metronomeBeat + 1) % 4;
        }, interval);
    }

    stopMetronome() {
        if (this.metronomeInterval) {
            clearInterval(this.metronomeInterval);
            this.metronomeInterval = null;

            document.querySelectorAll('.beat-indicator').forEach(ind => {
                ind.classList.remove('active');
            });
        }
    }

    playMetronomeClick(isAccent) {
        if (!window.ampStudio.audioContext) return;

        const ctx = window.ampStudio.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = isAccent ? 1000 : 800;
        gain.gain.value = 0.3;

        osc.start(ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.stop(ctx.currentTime + 0.05);
    }

    setupVisualizer() {
        const modeButtons = document.querySelectorAll('.visualizer-mode-btn');

        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.visualizerMode = btn.dataset.mode;
            });
        });

        this.visualizer = document.getElementById('visualizer');
    }

    startVisualizer() {
        const canvas = this.visualizer;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            const width = canvas.width;
            const height = canvas.height;

            ctx.fillStyle = '#0F0F1E';
            ctx.fillRect(0, 0, width, height);

            if (this.visualizerMode === 'waveform') {
                this.drawWaveform(ctx, width, height);
            } else if (this.visualizerMode === 'spectrum') {
                this.drawSpectrum(ctx, width, height);
            } else if (this.visualizerMode === 'meter') {
                this.drawMeter(ctx, width, height);
            }

            this.animationId = requestAnimationFrame(draw);
        };

        draw();
    }

    stopVisualizer() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    drawWaveform(ctx, width, height) {
        const data = window.ampStudio.getWaveformData();
        if (!data) return;

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FF6B35';
        ctx.beginPath();

        const sliceWidth = width / data.length;
        let x = 0;

        for (let i = 0; i < data.length; i++) {
            const v = data[i] / 128.0;
            const y = v * height / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.stroke();
    }

    drawSpectrum(ctx, width, height) {
        const data = window.ampStudio.getFrequencyData();
        if (!data) return;

        const barWidth = (width / data.length) * 2.5;
        let x = 0;

        for (let i = 0; i < data.length; i++) {
            const barHeight = (data[i] / 255) * height;

            const hue = (i / data.length) * 60 + 15; // Orange to red
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.fillRect(x, height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    drawMeter(ctx, width, height) {
        const level = window.ampStudio.getInputLevel();

        const barHeight = level * height;
        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#4CAF50');
        gradient.addColorStop(0.7, '#FFC107');
        gradient.addColorStop(1, '#F44336');

        ctx.fillStyle = gradient;
        ctx.fillRect(width / 2 - 50, height - barHeight, 100, barHeight);
    }

    setupMeters() {
        const updateMeters = () => {
            const inputMeter = document.getElementById('inputMeter');
            const outputMeter = document.getElementById('outputMeter');

            const inputLevel = window.ampStudio.getInputLevel() * 100;
            const outputLevel = window.ampStudio.getOutputLevel() * 100;

            inputMeter.style.width = Math.min(100, inputLevel) + '%';
            outputMeter.style.width = Math.min(100, outputLevel) + '%';

            requestAnimationFrame(updateMeters);
        };

        updateMeters();
    }

    setupSettings() {
        const settingsBtn = document.getElementById('settingsBtn');
        const modal = document.getElementById('settingsModal');
        const closeBtn = modal.querySelector('.close-btn');

        settingsBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    updateLatencyDisplay() {
        const display = document.getElementById('latencyDisplay');
        const latency = window.ampStudio.calculateLatency();
        display.textContent = `Latency: ${latency}ms`;

        // Color code
        if (latency < 10) {
            display.style.color = 'var(--success)';
        } else if (latency < 20) {
            display.style.color = 'var(--warning)';
        } else {
            display.style.color = 'var(--danger)';
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ampStudioUI = new AmpStudioUI();
    });
} else {
    window.ampStudioUI = new AmpStudioUI();
}

console.log('SoundWave AmpStudio UI loaded');
