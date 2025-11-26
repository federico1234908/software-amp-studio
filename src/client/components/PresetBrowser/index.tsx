import React from 'react';

const PresetBrowser = () => {
    const [presets, setPresets] = React.useState([]);
    const [selectedPreset, setSelectedPreset] = React.useState(null);

    React.useEffect(() => {
        // Fetch presets from the server
        const fetchPresets = async () => {
            try {
                const response = await fetch('/api/presets');
                const data = await response.json();
                setPresets(data);
            } catch (error) {
                console.error('Error fetching presets:', error);
            }
        };

        fetchPresets();
    }, []);

    const handlePresetSelect = (preset) => {
        setSelectedPreset(preset);
        // Additional logic to apply the selected preset can be added here
    };

    return (
        <div className="preset-browser">
            <h2>Preset Browser</h2>
            <ul>
                {presets.map((preset) => (
                    <li key={preset.id} onClick={() => handlePresetSelect(preset)}>
                        {preset.name}
                    </li>
                ))}
            </ul>
            {selectedPreset && (
                <div className="preset-details">
                    <h3>Selected Preset: {selectedPreset.name}</h3>
                    {/* Additional details about the selected preset can be displayed here */}
                </div>
            )}
        </div>
    );
};

export default PresetBrowser;