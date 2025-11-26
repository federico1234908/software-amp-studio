export function applyGain(audioContext: AudioContext, gainValue: number) {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = gainValue;
    return gainNode;
}

export function applyEQ(audioContext: AudioContext, frequency: number, gain: number) {
    const eqNode = audioContext.createBiquadFilter();
    eqNode.type = 'peaking';
    eqNode.frequency.value = frequency;
    eqNode.gain.value = gain;
    return eqNode;
}

export function applyDistortion(audioContext: AudioContext, amount: number) {
    const distortion = audioContext.createWaveShaper();
    distortion.curve = makeDistortionCurve(amount);
    distortion.oversample = '4x';
    return distortion;
}

function makeDistortionCurve(amount: number) {
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    let x;

    for (let i = 0; i < n_samples; ++i) {
        x = (i * 2) / n_samples - 1;
        curve[i] = (1 + amount) * x / (1 + amount * Math.abs(x));
    }
    return curve;
}