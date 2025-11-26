# SoundWave AmpStudio - Build Instructions

Guida per compilare l'applicazione desktop per Windows, macOS e Linux.

## 📋 Requisiti

- **Node.js** 16.x o superiore
- **npm** 8.x o superiore
- **Git** (opzionale)

### Requisiti specifici per piattaforma:

#### Windows
- Windows 10/11 (64-bit)
- Nessun requisito aggiuntivo

#### macOS
- macOS 11 (Big Sur) o superiore
- Xcode Command Line Tools: `xcode-select --install`

#### Linux
- Ubuntu 20.04+ / Debian 10+ / Fedora 35+
- Pacchetti richiesti:
  ```bash
  sudo apt-get install -y libgtk-3-0 libnotify4 libnss3 libxtst6 xdg-utils libatspi2.0-0 libdrm2 libgbm1 libasound2
  ```

## 🚀 Installazione Dipendenze

```bash
# 1. Entra nella directory del progetto
cd online-guitar-amp-app

# 2. Installa le dipendenze Node.js
npm install
```

## 🔨 Compilazione

### Test in Sviluppo (Development)

Avvia l'app in modalità sviluppo (senza creare installer):

```bash
npm run dev
```

oppure

```bash
npm run electron
```

### Build per la tua Piattaforma

Crea l'installer solo per il sistema operativo corrente:

```bash
npm run dist
```

I file saranno in `dist/`:
- **Windows**: `.exe` (installer) e `.exe` (portable)
- **macOS**: `.dmg` e `.zip`
- **Linux**: `.AppImage`, `.deb`, `.rpm`

### Build per Piattaforme Specifiche

#### Solo Windows
```bash
npm run dist:win
```

Output:
- `SoundWave-AmpStudio-1.0.0-Windows-x64.exe` (NSIS Installer)
- `SoundWave-AmpStudio-1.0.0-Windows-x64-portable.exe` (Portable)

#### Solo macOS
```bash
npm run dist:mac
```

Output:
- `SoundWave-AmpStudio-1.0.0-macOS-x64.dmg` (Intel)
- `SoundWave-AmpStudio-1.0.0-macOS-arm64.dmg` (Apple Silicon)
- File `.zip` per entrambe le architetture

#### Solo Linux
```bash
npm run dist:linux
```

Output:
- `SoundWave-AmpStudio-1.0.0-Linux-x64.AppImage`
- `SoundWave-AmpStudio-1.0.0-Linux-x64.deb` (Debian/Ubuntu)
- `SoundWave-AmpStudio-1.0.0-Linux-x64.rpm` (Fedora/RHEL)

### Build per Tutte le Piattaforme

⚠️ **Nota**: Alcune piattaforme richiedono il sistema nativo per la compilazione (es. macOS può essere compilato solo su Mac).

```bash
npm run dist:all
```

## 📁 Struttura Output

Dopo la build, troverai i file in `dist/`:

```
dist/
├── win-unpacked/                          # App Windows (non compressa)
├── mac/                                   # App macOS (non compressa)
├── linux-unpacked/                        # App Linux (non compressa)
├── SoundWave-AmpStudio-1.0.0-Windows-x64.exe
├── SoundWave-AmpStudio-1.0.0-Windows-x64-portable.exe
├── SoundWave-AmpStudio-1.0.0-macOS-x64.dmg
├── SoundWave-AmpStudio-1.0.0-macOS-arm64.dmg
├── SoundWave-AmpStudio-1.0.0-Linux-x64.AppImage
├── SoundWave-AmpStudio-1.0.0-Linux-x64.deb
└── SoundWave-AmpStudio-1.0.0-Linux-x64.rpm
```

## 🎯 Build Veloce (Solo Directory)

Per testare senza creare installer (più veloce):

```bash
npm run pack
```

Questo crea solo le directory `win-unpacked`, `mac`, `linux-unpacked` in `dist/`.

## 🔧 Personalizzazione

### Cambiare Versione

Modifica il campo `version` in `package.json`:

```json
{
  "version": "1.1.0"
}
```

### Cambiare Icone

Sostituisci i file in `build/`:
- `icon.ico` - Windows (256x256 px, formato ICO)
- `icon.icns` - macOS (formato ICNS con multiple risoluzioni)
- `icon.png` - Linux (512x512 px, formato PNG)

### Configurazione Avanzata

Modifica la sezione `build` in `package.json` per:
- Cambiare target di compilazione
- Aggiungere file extra
- Configurare firma del codice
- Personalizzare installer

## 📦 Dimensioni Approssimative

- **Installer Windows**: ~120 MB
- **DMG macOS**: ~130 MB
- **AppImage Linux**: ~115 MB
- **App installata**: ~200-250 MB

## ⚡ Ottimizzazione

### Ridurre Dimensione

1. Rimuovi DevTools dalla build di produzione
2. Abilita compressione in `electron-builder`
3. Usa `asar` per impacchettare file

### Performance

L'app è già ottimizzata con:
- Hardware acceleration disabilitata (maggiore compatibilità)
- Context isolation abilitato (sicurezza)
- Preload script per IPC sicuro

## 🐛 Troubleshooting

### Errore: "electron-builder not found"
```bash
npm install --save-dev electron-builder
```

### Errore: "Cannot find module 'electron'"
```bash
npm install --save-dev electron
```

### Build fallisce su Linux
Installa le dipendenze di sistema:
```bash
sudo apt-get install -y libgtk-3-0 libnotify4 libnss3 libxtst6
```

### Build macOS su Windows/Linux
Non è possibile. Serve un Mac per compilare per macOS (o usa servizi cloud come GitHub Actions).

## 📝 Script Rapidi

Per Windows, crea `build.bat`:
```batch
@echo off
echo Building SoundWave AmpStudio for Windows...
npm install
npm run dist:win
echo Done! Check the dist/ folder
pause
```

Per Linux/macOS, crea `build.sh`:
```bash
#!/bin/bash
echo "Building SoundWave AmpStudio..."
npm install
npm run dist
echo "Done! Check the dist/ folder"
```

## 🚀 Distribuzione

Dopo la build, puoi distribuire i file:

1. **GitHub Releases**: Carica i file su GitHub
2. **Sito Web**: Metti i link download sul sito
3. **Auto-updater**: Configura electron-updater per aggiornamenti automatici

## 📄 Licenza

Questo software è rilasciato sotto licenza MIT - completamente gratuito e open source.

## 🆘 Supporto

Per problemi di build:
- Issues: https://github.com/soundwave-amplifiers/ampstudio/issues
- Email: corniolafederico07@gmail.com

---

**Fatto con ❤️ da SoundWave Amplifiers**
