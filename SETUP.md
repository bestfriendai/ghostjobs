# GhostJobs - Setup & Launch Guide

## Prerequisites

- Node.js 18+
- Expo CLI
- Xcode (iOS)
- Android Studio (Android)
- EAS CLI

---

## Installation

```bash
cd ghostjobs
npm install
npx expo start
```

### Running

```bash
# iOS
npx expo start --ios

# Android
npx expo start --android
```

---

## App Store Setup

### iOS

1. Bundle ID: `com.ghostjobs.app`
2. Create app in App Store Connect
3. EAS build and submit

### Android

1. Package: `com.ghostjobs.app`
2. Create app in Play Console
3. EAS build and submit

---

## EAS Commands

```bash
eas build -p ios --profile production
eas submit -p ios
```
