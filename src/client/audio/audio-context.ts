export const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export const createGainNode = () => {
    return audioContext.createGain();
};

export const createOscillator = () => {
    return audioContext.createOscillator();
};

export const createMediaStreamSource = (stream) => {
    return audioContext.createMediaStreamSource(stream);
};

export const connectNodes = (source, destination) => {
    source.connect(destination);
};

export const startAudioContext = async () => {
    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }
};