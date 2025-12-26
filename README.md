# My Universal App

A cross-platform native application for **Windows**, **Android**, and **iOS**.
Built with **React Native (Expo)** and **Tauri 2.0**.

## 🛑 Critical Prerequisite for Windows Build

To build the Windows `.exe`, you **MUST** install Rust and C++ Build Tools.
If you do not do this, `npm run build:windows` will fail.

1.  **Download & Install**: [Rustup (rustup.rs)](https://rustup.rs/)
2.  During installation, if prompted, install **Visual Studio C++ Build Tools**.

## 🚀 How to Run

### Development
- **Mobile (Android/iOS) & Web**:
  ```bash
  npm start
  # Press 'a' for Android, 'w' for Web
  ```
- **Windows Desktop**:
  ```bash
  npm run dev:windows
  ```

### 📦 How to Build (Downloadable Files)

1.  **Android (`.apk`)**:
    ```bash
    npm run build:android
    # Output: android/app/build/outputs/apk/release/app-release.apk
    ```

2.  **Windows (`.exe` / `.msi`)**:
    ```bash
    npm run build:windows
    # Output: src-tauri/target/release/bundle/nsis/my-universal-app_..._setup.exe
    ```

3.  **iOS (`.ipa`)**:
    Since you are on Windows, you must use EAS Build (Cloud):
    ```bash
    npx eas build -p ios
    ```

## ☁️ GitHub & Auto-Updates

**Repository**: [https://github.com/amer585/teacher-app](https://github.com/amer585/teacher-app)

### Setting up Auto-Updates
The app is configured to check for updates at:
`https://github.com/amer585/teacher-app/releases/latest/download/latest.json`

To make this work securely, you must:
1.  **Generate Keys**: Run `npx tauri signer generate -w src-tauri/tauri.conf.json`.
2.  **Set Secrets**: Add the private key to your environment variables (`TAURI_PRIVATE_KEY`) when building.
3.  **Release**: When you push a new tag to GitHub, upload the `.msi.zip` and `latest.json` to the Release assets.

## 📂 Project Structure

- `app/`: Your screens and navigation (Expo Router).
- `src-tauri/`: Windows native configuration (Rust).
- `src/native/`: Native modules (FileSystem, etc.).
- `android/`: Native Android project.
