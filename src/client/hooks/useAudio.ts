import { useEffect, useState } from 'react';

const useAudio = () => {
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [inputStream, setInputStream] = useState<MediaStream | null>(null);
    const [outputStream, setOutputStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const initAudio = async () => {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            setAudioContext(context);

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setInputStream(stream);
            } catch (error) {
                console.error('Error accessing audio input:', error);
            }
        };

        initAudio();

        return () => {
            if (audioContext) {
                audioContext.close();
            }
        };
    }, []);

    return { audioContext, inputStream, outputStream };
};

export default useAudio;