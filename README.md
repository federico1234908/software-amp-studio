# 🎸 SoundWave AmpStudio

**Professional Guitar Amplifier Simulator - 100% Free & Open Source**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Windows%20%7C%20macOS%20%7C%20Linux-blue)](https://github.com/federico1234908/software-amp-studio)

A powerful guitar amplifier simulator that runs in your browser or as a desktop application. Completely free alternative to STL Tones and similar paid software.

## ✨ Features

### 🎛️ Core Features
- **Multiple Amplifier Models** - Accurate simulations of classic amps (GT-100, BS-500, and more)
- **50+ Professional Effects** - Overdrive, Distortion, Delay, Reverb, Chorus, Flanger, Phaser, Wah, Compressor, and more
- **Cabinet IR Loader** - Load your own Impulse Responses or use our professional studio-recorded cabinets
- **Unlimited Presets** - Save, load, import, and export your settings
- **Real-time Processing** - Ultra-low latency (<5ms) for live playing

### 🔧 Built-in Tools
- **Tuner** - Chromatic tuner with support for standard, drop, and custom tunings
- **Metronome** - Advanced metronome with compound time signatures and custom accents
- **Looper** - Multi-layer looper with unlimited recording time
- **Recorder** - Multi-track recorder with high-quality export (24bit/96kHz WAV, MP3, FLAC)

### 🌐 Platform Support
- **Web App** - Works in any modern browser (Chrome, Firefox, Safari, Edge)
- **Desktop App** - Native applications for Windows, macOS, and Linux
- **DAW Integration** - Use as VST3, AU, AAX plugin (coming soon)

## 🚀 Quick Start

### Web App (Instant - No Installation)

Just visit: **[Try SoundWave AmpStudio](https://yourwebsite.com/ampstudio.html)**

### Desktop App

**Download:**
- [Windows Installer](https://github.com/federico1234908/software-amp-studio/releases) (Windows 10/11 64-bit)
- [macOS DMG](https://github.com/federico1234908/software-amp-studio/releases) (Intel & Apple Silicon)
- [Linux AppImage/DEB/RPM](https://github.com/federico1234908/software-amp-studio/releases)

**Or build from source** (see [BUILD.md](BUILD.md))

## 📦 Installation

### Prerequisites
- Node.js 16.x or higher
- npm 8.x or higher

### Clone and Install
```bash
# Clone the repository
git clone https://github.com/federico1234908/software-amp-studio.git
cd software-amp-studio

# Install dependencies
npm install

# Run in development mode
npm run dev
```

### Build Desktop App
```bash
# Build for your current platform
npm run dist

# Build for specific platforms
npm run dist:win    # Windows
npm run dist:mac    # macOS
npm run dist:linux  # Linux
```

See [BUILD.md](BUILD.md) for detailed build instructions.

## 🎯 Usage

### Web App
1. Connect your guitar to your audio interface
2. Open the web app in your browser
3. Click "Start Audio" and select your audio input device
4. Start playing!

### Desktop App
1. Launch SoundWave AmpStudio
2. The app automatically detects your audio interface
3. Configure audio settings in File → Audio Settings
4. Load a preset or create your own sound

### Keyboard Shortcuts
- `Ctrl/Cmd + N` - New preset
- `Ctrl/Cmd + O` - Open preset
- `Ctrl/Cmd + S` - Save preset
- `Ctrl/Cmd + E` - Export audio
- `Ctrl/Cmd + T` - Open tuner
- `Ctrl/Cmd + M` - Open metronome
- `Ctrl/Cmd + L` - Open looper
- `Ctrl/Cmd + R` - Open recorder
- `Ctrl/Cmd + Space` - Start/Stop audio

## 🆚 Why Choose SoundWave AmpStudio?

### vs. STL Tones AmpHub

| Feature | SoundWave AmpStudio | STL Tones |
|---------|---------------------|-----------|
| Price | **FREE Forever** | $10/month or $100/year |
| Amplifier Models | Unlimited | Limited |
| Effects | 50+ Included | Basic (paid extras) |
| Looper | ✅ Built-in | ❌ Not included |
| Recorder | ✅ Multi-track | ❌ Not included |
| Tuner & Metronome | ✅ Included | ❌ Not included |
| Presets | ✅ Unlimited | 💰 Paid library |
| Updates | ✅ Free | 💰 Subscription required |
| Open Source | ✅ Yes | ❌ Closed |
| Registration | ❌ Not required | ✅ Required |

## 📁 Project Structure

```
ampstudio/
├── public/              # Web app static files
│   ├── ampstudio.html  # Main amplifier interface
│   ├── software.html   # Download page
│   └── index.html      # Homepage
├── electron/           # Desktop app (Electron)
│   ├── main.js         # Main process
│   └── preload.js      # Preload script
├── src/
│   ├── client/         # Web app source (TypeScript/React)
│   └── server/         # Backend API
├── build/              # Build resources (icons, etc.)
├── .github/            # GitHub Actions workflows
└── config/             # Build configuration
```

## 🛠️ Development

### Running in Development Mode
```bash
# Start web app development server
npm start

# Start Electron development app
npm run dev
```

### Testing
```bash
npm test
```

### Code Style
```bash
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports & Feature Requests

Please use [GitHub Issues](https://github.com/federico1234908/software-amp-studio/issues) to report bugs or request features.

## 📋 System Requirements

### Minimum
- **CPU:** Dual-core 2.0 GHz
- **RAM:** 4 GB
- **Storage:** 500 MB
- **Audio:** ASIO/CoreAudio compatible interface

### Recommended
- **CPU:** Quad-core 2.5+ GHz
- **RAM:** 8+ GB
- **Storage:** 2 GB (for IR library)
- **Audio:** Dedicated audio interface (Focusrite Scarlett, PreSonus AudioBox, etc.)

### Browser Requirements (Web App)
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic amplifier designs
- Built with [Electron](https://www.electronjs.org/), [React](https://reactjs.org/), and [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- Icons and design by the SoundWave team

## 📞 Contact & Support

- **Website:** [soundwave-amplifiers.com](https://yourwebsite.com)
- **Email:** corniolafederico07@gmail.com
- **Phone:** +39 392 679 8664
- **GitHub Issues:** [Report a bug](https://github.com/federico1234908/software-amp-studio/issues)

## ⭐ Show Your Support

If you like this project, please give it a star on GitHub! It helps us grow and improve.

---

**Made with ❤️ by SoundWave Amplifiers** | *Amplificatori artigianali italiani dal 1995*
