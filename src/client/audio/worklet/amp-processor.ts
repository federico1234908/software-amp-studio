class AmpProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this._gain = 1.0; // Default gain value
        this.port.onmessage = (event) => {
            if (event.data.type === 'setGain') {
                this._gain = event.data.value;
            }
        };
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        const output = outputs[0];

        for (let channel = 0; channel < output.length; channel++) {
            const inputChannel = input[channel];
            const outputChannel = output[channel];

            for (let i = 0; i < inputChannel.length; i++) {
                outputChannel[i] = inputChannel[i] * this._gain; // Apply gain
            }
        }

        return true; // Keep the processor alive
    }
}

registerProcessor('amp-processor', AmpProcessor);