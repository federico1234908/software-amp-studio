# Downloads Directory

This directory is for hosting installer files if you want to serve them directly from your website.

## Current Setup

Currently, the website download buttons point to:
- **Primary**: The Web App ([ampstudio.html](../ampstudio.html))
- **Secondary**: GitHub Releases page

## To Host Installers Here

If you want to host the installer files on your own server instead of GitHub:

1. **Build the installers** (see [RELEASE.md](../../RELEASE.md))

2. **Copy the files here**:
   ```
   public/downloads/
   ├── SoundWave-AmpStudio-1.0.0-Windows-x64.exe
   ├── SoundWave-AmpStudio-1.0.0-Windows-x64-portable.exe
   ├── SoundWave-AmpStudio-1.0.0-macOS-x64.dmg
   ├── SoundWave-AmpStudio-1.0.0-macOS-arm64.dmg
   ├── SoundWave-AmpStudio-1.0.0-Linux-x64.AppImage
   ├── SoundWave-AmpStudio-1.0.0-Linux-x64.deb
   └── SoundWave-AmpStudio-1.0.0-Linux-x64.rpm
   ```

3. **Update [software.html](../software.html)** to point to these files:
   ```html
   <!-- Windows -->
   <a href="downloads/SoundWave-AmpStudio-1.0.0-Windows-x64.exe" class="btn btn-primary">Download .exe</a>

   <!-- macOS Intel -->
   <a href="downloads/SoundWave-AmpStudio-1.0.0-macOS-x64.dmg" class="btn btn-primary">Download .dmg (Intel)</a>

   <!-- macOS Apple Silicon -->
   <a href="downloads/SoundWave-AmpStudio-1.0.0-macOS-arm64.dmg" class="btn btn-primary">Download .dmg (M1/M2)</a>

   <!-- Linux -->
   <a href="downloads/SoundWave-AmpStudio-1.0.0-Linux-x64.AppImage" class="btn btn-primary">Download .AppImage</a>
   ```

## GitHub Releases (Recommended)

Using GitHub Releases is easier because:
- No need to upload large files to your web server
- GitHub handles the bandwidth
- Automatic versioning and changelog
- Users trust downloads from official repositories

The website already links to GitHub Releases, so once you create a release there, downloads will work automatically!

## File Sizes

Expect these approximate sizes:
- Windows .exe: ~120-150 MB
- macOS .dmg: ~130-160 MB
- Linux .AppImage: ~115-140 MB
- Portable versions: Similar sizes

Make sure your web server has enough storage and bandwidth if hosting locally.
