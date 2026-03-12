# reactiv-technical-assessment

A bare-bones React Native app with TypeScript (no Expo).

## Prerequisites

- **Node.js** >= 18
- **npm** (or yarn)
- **iOS**: macOS with Xcode and [CocoaPods](#installing-cocoapods-ios-only)
- **Android**: Android Studio, Android SDK, and an emulator or device
- **Watchman** (recommended): `brew install watchman`

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **iOS only: install CocoaPods and project dependencies**

   If `pod` is not found, install CocoaPods first (see [Installing CocoaPods](#installing-cocoapods-ios-only) below). Then:

   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android only**: ensure `ANDROID_HOME` is set and you have an emulator or device.

## Run the app

1. **Start Metro**

   ```bash
   npm start
   ```

2. **Run on a platform** (in a second terminal)

   - **iOS**

     ```bash
     npm run ios
     ```

   - **Android**

     ```bash
     npm run android
     ```

## Installing CocoaPods (iOS only)

If you see `command not found: pod`, install CocoaPods first.

**Option A – Homebrew (recommended on Apple Silicon):**

```bash
brew install cocoapods
```

**Option B – RubyGems:**

```bash
sudo gem install cocoapods
```

Then run `cd ios && pod install && cd ..` from the project root.

## Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm start`       | Start Metro bundler            |
| `npm run ios`     | Run the app on iOS simulator   |
| `npm run android` | Run the app on Android         |
| `npm run lint`    | Run ESLint                     |
