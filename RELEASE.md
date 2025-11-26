# Release Guide - SoundWave AmpStudio

Questa guida spiega come creare e pubblicare gli installer per Windows, macOS e Linux.

## Opzione 1: Build Automatico con GitHub Actions (Consigliato)

GitHub Actions può creare automaticamente gli installer per tutte le piattaforme quando crei una nuova release.

### Passaggi:

1. **Assicurati che il codice sia su GitHub**
   ```bash
   git add .
   git commit -m "Prepare for release"
   git push origin main
   ```

2. **Crea un tag versione**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. **GitHub Actions farà automaticamente**:
   - Build per Windows (.exe installer + portable)
   - Build per macOS (.dmg per Intel e Apple Silicon)
   - Build per Linux (.AppImage, .deb, .rpm)
   - Crea un GitHub Release con tutti i file

4. **Risultato**:
   - Vai su `https://github.com/soundwave-amplifiers/ampstudio/releases`
   - Troverai tutti gli installer pronti per il download!

### Build Manuale (solo se necessario)

Se vuoi forzare una build senza creare un tag:
- Vai su GitHub → Actions → "Build and Release" → "Run workflow"

---

## Opzione 2: Build Locale

### Windows

Per costruire su Windows, devi eseguire il comando con privilegi amministratore:

1. **Apri PowerShell come Amministratore**
   - Tasto destro su PowerShell → "Esegui come amministratore"

2. **Naviga nella directory del progetto**
   ```powershell
   cd C:\Users\corni\.vscode\online-guitar-amp-app
   ```

3. **Abilita Developer Mode (necessario per i symlink)**
   - Vai su Impostazioni Windows → Aggiornamento e sicurezza → Per sviluppatori
   - Attiva "Modalità sviluppatore"

   OPPURE abilita i symlink tramite Group Policy:
   - Esegui `gpedit.msc`
   - Vai a: Computer Configuration → Windows Settings → Security Settings → Local Policies → User Rights Assignment
   - Trova "Create symbolic links"
   - Aggiungi il tuo utente

4. **Esegui il build**
   ```bash
   npm run dist:win
   ```

5. **Troverai i file in `dist/`**:
   - `SoundWave-AmpStudio-1.0.0-Windows-x64.exe` (Installer)
   - `SoundWave-AmpStudio-1.0.0-Windows-x64-portable.exe` (Portable)

### macOS

Build per macOS può essere fatto solo su un Mac:

```bash
npm run dist:mac
```

Output in `dist/`:
- `SoundWave-AmpStudio-1.0.0-macOS-x64.dmg` (Intel)
- `SoundWave-AmpStudio-1.0.0-macOS-arm64.dmg` (Apple Silicon)

### Linux

```bash
npm run dist:linux
```

Output in `dist/`:
- `SoundWave-AmpStudio-1.0.0-Linux-x64.AppImage`
- `SoundWave-AmpStudio-1.0.0-Linux-x64.deb`
- `SoundWave-AmpStudio-1.0.0-Linux-x64.rpm`

---

## Risolvere Problemi Comuni

### Windows: "Cannot create symbolic link"

**Problema**: Durante il build su Windows appare errore sui symbolic links.

**Soluzione**:
1. Abilita "Modalità sviluppatore" in Windows (vedi sopra)
2. OPPURE esegui come amministratore
3. OPPURE usa GitHub Actions (build su cloud)

### macOS: "App is damaged"

**Problema**: macOS dice che l'app è danneggiata.

**Soluzione**:
- Devi firmare l'app con un Apple Developer Certificate
- Alternativa: gli utenti possono eseguire `xattr -cr /Applications/SoundWave\ AmpStudio.app`

### Mancano le Icone

Le icone non sono attualmente incluse nel progetto. Aggiungi:
- `build/icon.ico` per Windows (256x256)
- `build/icon.icns` per macOS
- `build/icon.png` per Linux (512x512)

---

## Pubblicare gli Installer sul Sito Web

### Opzione A: Usare GitHub Releases (Consigliato)

I link nelle pagine HTML puntano già a GitHub Releases:
```
https://github.com/soundwave-amplifiers/ampstudio/releases
```

Non serve fare nulla! Quando crei una release su GitHub, i download saranno disponibili automaticamente.

### Opzione B: Hosting Proprio

Se vuoi hostare i file sul tuo server:

1. **Carica i file** nella cartella `public/downloads/`:
   ```
   public/downloads/
   ├── SoundWave-AmpStudio-1.0.0-Windows-x64.exe
   ├── SoundWave-AmpStudio-1.0.0-macOS-x64.dmg
   ├── SoundWave-AmpStudio-1.0.0-macOS-arm64.dmg
   └── SoundWave-AmpStudio-1.0.0-Linux-x64.AppImage
   ```

2. **Modifica `software.html`** per puntare ai file locali:
   ```html
   <a href="downloads/SoundWave-AmpStudio-1.0.0-Windows-x64.exe" class="btn btn-primary">Download .exe</a>
   ```

---

## Versioning

Quando crei una nuova versione:

1. **Aggiorna `package.json`**:
   ```json
   {
     "version": "1.1.0"
   }
   ```

2. **Crea un tag Git**:
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```

3. **GitHub Actions farà il resto!**

---

## Checklist Prima di una Release

- [ ] Test dell'app in modalità development (`npm run dev`)
- [ ] Aggiornato `package.json` con nuova versione
- [ ] Aggiornato `CHANGELOG.md` (se esiste)
- [ ] Tutti i commit pushati su GitHub
- [ ] Creato tag versione (`git tag v1.x.x`)
- [ ] Push del tag (`git push origin v1.x.x`)
- [ ] Attendi che GitHub Actions completi il build
- [ ] Verifica che la release sia pubblicata su GitHub
- [ ] Testa i download da GitHub Releases

---

## Contatti

Per problemi con il build process:
- GitHub Issues: https://github.com/soundwave-amplifiers/ampstudio/issues
- Email: corniolafederico07@gmail.com
