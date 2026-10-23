# Motor Vision Mobile

Native Android and iOS client for the existing Motor Vision platform. The app is built with Expo, React Native, TypeScript and Expo Router. It does not contain a backend, trained model, or duplicated inference code.

## Current implementation

- Native five-tab navigation: Home, Explore, Price, Risk and Account.
- Motor Vision visual language and responsive native layouts.
- Six clearly labelled synthetic catalogue vehicles from the website prototype.
- Environment-based API client for the existing Node backend.
- Risk assessment request and response contracts.
- Existing email-login endpoint integration.
- SecureStore adapter reserved for the approved mobile refresh-token flow.
- Honest pending states for price inference, recommendation and financing features that do not yet have backend APIs.

## Requirements

- Node.js LTS
- npm
- Expo Go or an Android/iOS simulator
- The existing `Motor-Vision` backend for API-connected features

## Setup

```bash
npm install
cp .env.example .env
npm start
```

Set `EXPO_PUBLIC_API_URL` for the target environment:

```env
# Android emulator
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000

# iOS simulator
EXPO_PUBLIC_API_URL=http://127.0.0.1:3000

# Physical device (replace with the development computer's LAN IP)
EXPO_PUBLIC_API_URL=http://192.168.1.20:3000

# Production
EXPO_PUBLIC_API_URL=https://api.example.com
```

Run a target directly:

```bash
npm run android
npm run ios
npm run web
```

Verify TypeScript:

```bash
npm run typecheck
```

## Backend compatibility note

The current website backend binds to `127.0.0.1` and restricts risk/listing requests to localhost. Physical-device and Android-emulator integration therefore requires the approved backend mobile-integration branch to add configurable binding, explicit origin policy and native session/OAuth exchange. Until then, screens surface connection errors without generating fallback or fake AI results.

## Security

- Never put OAuth client secrets, `SESSION_SECRET`, database credentials or model files in this repository.
- `EXPO_PUBLIC_*` values are bundled into the application and must contain only public configuration such as the API base URL.
- Mobile refresh credentials will be stored with Expo SecureStore once the backend issues the approved mobile session tokens.
- Production API traffic must use HTTPS.

## Source boundaries

The existing website, Node backend, MongoDB integration, Python worker and AI model artifacts remain in the separate `Motor-Vision` repository. This repository contains only mobile presentation, navigation, client-side validation, public API contracts and mobile-specific storage/configuration.
