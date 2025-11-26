import React from 'react';

const Controls: React.FC = () => {
    return (
        <div className="controls">
            <h2>Amplifier Controls</h2>
            <div className="control">
                <label htmlFor="gain">Gain</label>
                <input type="range" id="gain" min="0" max="10" step="0.1" />
            </div>
            <div className="control">
                <label htmlFor="bass">Bass</label>
                <input type="range" id="bass" min="0" max="10" step="0.1" />
            </div>
            <div className="control">
                <label htmlFor="mid">Mid</label>
                <input type="range" id="mid" min="0" max="10" step="0.1" />
            </div>
            <div className="control">
                <label htmlFor="treble">Treble</label>
                <input type="range" id="treble" min="0" max="10" step="0.1" />
            </div>
            <div className="control">
                <label htmlFor="volume">Volume</label>
                <input type="range" id="volume" min="0" max="10" step="0.1" />
            </div>
        </div>
    );
};

export default Controls;