import React, { useState } from 'react';

const AudioIOModal = ({ isOpen, onClose }) => {
    const [inputDevice, setInputDevice] = useState('');
    const [outputDevice, setOutputDevice] = useState('');

    const handleInputChange = (event) => {
        setInputDevice(event.target.value);
    };

    const handleOutputChange = (event) => {
        setOutputDevice(event.target.value);
    };

    const handleSave = () => {
        // Logic to save the selected input/output devices
        console.log('Input Device:', inputDevice);
        console.log('Output Device:', outputDevice);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="audio-io-modal">
            <h2>Audio Input/Output Settings</h2>
            <div>
                <label>
                    Input Device:
                    <select value={inputDevice} onChange={handleInputChange}>
                        <option value="">Select Input Device</option>
                        {/* Options for input devices will be populated here */}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Output Device:
                    <select value={outputDevice} onChange={handleOutputChange}>
                        <option value="">Select Output Device</option>
                        {/* Options for output devices will be populated here */}
                    </select>
                </label>
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default AudioIOModal;