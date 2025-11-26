# How to Create a GitHub Release Manually

Since GitHub Actions didn't build the installers automatically, here's how to create a release manually:

## Option 1: Use Web App Only (Current Setup)

**This is already working!**

Your website now shows:
- **Primary button**: "🌐 Usa Web App Ora" → Opens the amp simulator (works immediately!)
- **Secondary button**: "💾 Vai a Releases" → Links to GitHub releases page

Users can use your software right now through the web app without any installation!

---

## Option 2: Build and Upload Installers Manually

If you want to provide desktop installers, follow these steps:

### Step 1: Build the Installers Locally

**For Windows:**
```bash
# Run as Administrator or with Developer Mode enabled
npm run dist:win
```

This creates in `dist/`:
- `SoundWave-AmpStudio-1.0.0-Windows-x64.exe` (Installer)
- `SoundWave-AmpStudio-1.0.0-Windows-x64-portable.exe` (Portable)

**Note:** If you get permission errors, see [RELEASE.md](RELEASE.md) for solutions.

### Step 2: Create GitHub Release

1. Go to: https://github.com/federico1234908/software-amp-studio/releases

2. Click "**Create a new release**"

3. Fill in the form:
   - **Choose a tag**: `v1.0.0` (or create new)
   - **Release title**: `SoundWave AmpStudio v1.0.0`
   - **Description**: Copy the template below

4. **Drag and drop** your installer files from the `dist/` folder

5. Click "**Publish release**"

### Release Description Template

```markdown
# 🎸 SoundWave AmpStudio v1.0.0

Professional guitar amplifier simulator - 100% Free & Open Source!

## 📥 Downloads

### 🌐 Web App (No Installation Required)
**Try it now:** [Launch Web App](https://yourwebsite.com/ampstudio.html)

Works instantly in your browser - no download needed!

### 💾 Desktop Apps

#### Windows
- **Installer** (Recommended): `SoundWave-AmpStudio-1.0.0-Windows-x64.exe`
- **Portable**: `SoundWave-AmpStudio-1.0.0-Windows-x64-portable.exe`

#### macOS
- **Intel Macs**: `SoundWave-AmpStudio-1.0.0-macOS-x64.dmg`
- **M1/M2 Macs**: `SoundWave-AmpStudio-1.0.0-macOS-arm64.dmg`

#### Linux
- **Universal**: `SoundWave-AmpStudio-1.0.0-Linux-x64.AppImage`
- **Debian/Ubuntu**: `SoundWave-AmpStudio-1.0.0-Linux-x64.deb`
- **Fedora/RHEL**: `SoundWave-AmpStudio-1.0.0-Linux-x64.rpm`

## ✨ Features

- **Multiple Amplifier Models** - Accurate simulations of classic amps
- **50+ Professional Effects** - Overdrive, Distortion, Delay, Reverb, and more
- **Built-in Tools** - Tuner, Metronome, Looper, Recorder
- **Unlimited Presets** - Save and share your sounds
- **Ultra-Low Latency** - <5ms for real-time playing
- **100% Free** - No subscriptions, no ads, no limits

## 📋 System Requirements

### Windows
- Windows 10/11 (64-bit)
- 4GB RAM minimum
- Audio interface recommended

### macOS
- macOS 11 (Big Sur) or later
- Intel or Apple Silicon (M1/M2)
- 4GB RAM minimum

### Linux
- Ubuntu 20.04+, Debian 10+, or compatible
- 4GB RAM minimum
- ALSA or PulseAudio

## 🐛 Found a Bug?

Report issues here: [GitHub Issues](https://github.com/federico1234908/software-amp-studio/issues)

## 💬 Contact

- **Email:** corniolafederico07@gmail.com
- **Phone:** +39 392 679 8664

---

**Made with ❤️ by SoundWave Amplifiers**

*Completely free alternative to STL Tones and other paid amp simulators!*
```

---

## Option 3: Fix GitHub Actions (Advanced)

The GitHub Actions workflow is already set up but may need permissions:

1. Go to: https://github.com/federico1234908/software-amp-studio/settings/actions

2. Under "Workflow permissions", select:
   - ✅ **Read and write permissions**

3. Save changes

4. Re-run the workflow or create a new tag:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

5. GitHub will automatically build all installers!

---

## Current Status

✅ **Web App** - Working now!
✅ **GitHub Repository** - Live and ready
✅ **Website** - Download buttons configured
⏳ **Desktop Installers** - Optional, can be added anytime

Your users can already use the full-featured Web App without waiting for desktop installers!

---

## Quick Summary

**Right now:**
- Users click "🌐 Usa Web App Ora" → Software works immediately
- Users click "💾 Vai a Releases" → See GitHub releases page

**To add desktop installers:**
1. Build locally: `npm run dist:win` (on Windows)
2. Go to GitHub → Releases → "Create a new release"
3. Upload the `.exe` files from `dist/` folder
4. Publish release

**Then download buttons will have actual files to download!**

---

The web app is the easiest solution and it's already working perfectly. Desktop installers are optional and can be added later when needed.
