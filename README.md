# Reactiv Technical Assessment

This repository is a small React Native sample app demonstrating a product catalog and cart. This README explains setup, running, architecture, and notable tradeoffs.

**Setup instructions**

- Prerequisites:
  - Node.js >= 22.11.0 (see `package.json` engines)
  - Watchman (recommended on macOS)
  - Xcode (for iOS) or Android SDK (for Android)
  - CocoaPods for iOS (`sudo gem install cocoapods`)

- Install and prepare dependencies:

```bash
git clone <repo-url>
cd reactiv-technical-assessment
npm install
# iOS only: install CocoaPods
cd ios && pod install && cd ..
```

**Required environment variables**

- None required by default. The app uses an in-repo `PRODUCTS_URL` constant in [App.tsx](App.tsx#L1-L240). If you need to point to a different product feed, change that constant or wire an env variable into the app startup.

**How to run the app**

- Start Metro (packager):

```bash
npm start
```

- Run on iOS simulator:

```bash
npm run ios
```

- Run on Android emulator:

```bash
npm run android
```

- Run tests:

```bash
npm test
```

**High-level architecture diagram**

```mermaid
flowchart TD
  UI[UI Screens]
  UI -->|calls| AppState[App (useState / useReducer)]
  AppState -->|dispatches| CartLogic[cart helpers / reducer]
  AppState -->|persists| Storage[AsyncStorage]
  AppState -->|fetches| Network[Products API]
  CartLogic -->|uses| Money[money helpers]
  UI -->|formats| Format[formatMoney]
  note right of AppState: Navigation state is serializable (productId)
```

**Notable tradeoffs and assumptions**

- Money representation: the code uses integer cents (`amountCents`) to avoid floating point rounding issues; this is a deliberate design choice and simplifies arithmetic (`calculateSubtotal` uses cents).
- Local persistence: `AsyncStorage` is used for product cache and cart persistence. Hydration and normalization currently live in `App.tsx`; this is simple but mixes side effects and parsing logic with UI lifecycle.
- Navigation: local navigation is implemented via a serializable `ScreenState` union (`navigation.ts`) that passes `productId` for the details route rather than heavy objects.
- Test coverage: unit tests currently cover pure cart helpers (`__tests__/cart.test.ts`). Side-effect code (network, storage) is not yet covered and would benefit from extracting services and adding mocks.
- UI: the app uses React Native core components (no external UI component libraries). This keeps the surface small but requires custom styling.
