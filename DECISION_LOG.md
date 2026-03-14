AI Usage & Decision Log
=======================

Summary
-------
This document records how the AI was used to audit and modify the codebase, which changes were applied or rejected, the technical tradeoffs made, and what further improvements would be made with more time.

1) How AI was used
-------------------
At the start, I used AI to get an app with basic functionality running (installing dependencies, starting the packager, and verifying the sample UI and tests). After that initial working app was available, I asked AI to add in each required feature one at a time, and reviewed the output. I did it this way in order to break down each feature and review the code. I then used AI to audit the code for correctness, domain modeling, and TypeScript usage — the work below documents that audit and the resulting code changes.

Practical interactions and workflow:
- I asked the AI to read key files (`types.ts`, `cart.ts`, `formatMoney.ts`, `App.tsx`, tests and screens) to understand current domain types and logic.
- The assistant proposed targeted, minimal changes to improve correctness and type safety; I approved and the assistant applied edits directly to repository files (via patch operations).
- After each change the assistant ran the test suite (`npm test`) to verify behavior and iterated when tests failed or needed updates.
- The assistant created small helper modules (e.g., `money.ts`), updated tests, and adjusted UI wiring to reflect new domain shapes.

Suggested and implemented concrete fixes and improvements:
- Converting money representation from a string `amount` to integer `amountCents`.
- Adding money helper utilities (`money.ts`) to centralize conversions and parsing.
- Fixing `decrementCartItem` so a line item can reach zero and be removed.
- Improving `calculateSubtotal` to operate on cents and validate that all items use the same currency.
- Updating `formatMoney`, tests, and UI screens to use the new money shape.
- Centralizing navigation state into `navigation.ts` and making the details route use `productId` (serializable navigation state).
- Adding normalization during product and cart hydration to accept legacy shapes while migrating to the new money model.
- Adding a README and this decision log to document work and design choices.

Verification loop:
- Each change was committed via patch operations and validated by running unit tests. The AI repeatedly adjusted code until tests passed and UI code compiled in local checks where applicable.

Notes on AI role:
- The assistant acted as an automated pair-programmer: reading code, proposing edits, applying patches, and running tests. I retained control over acceptance and the repository state.


2) What was changed or rejected
--------------------------------
Changed (applied):
- `cart.ts`: money type, `NewCartItem` type, fix to `decrementCartItem`, `calculateSubtotal` using cents.
- `money.ts`: new helpers (`moneyFromString`, `moneyToNumber`, etc.).
- `formatMoney.ts`: updated to format from `amountCents`.
- `__tests__/cart.test.ts`: updated fixtures to use `amountCents` and continued passing tests.
- `screens/CartScreen.tsx`: construct subtotal/total using `amountCents`.
- `App.tsx`: added normalization when hydrating network/cache and stored cart, wired `moneyFromString` for legacy shapes.
- `navigation.ts`: exported serializable `ScreenState` and updated `App.tsx` to use `productId` and lookup product at render time.
- `README.md`: added setup, architecture and tradeoffs.

Considered but rejected (or postponed):
- Keeping `Money.amount` as a string and continuing to parse to numbers everywhere — rejected because it increases risk of subtle numeric/rounding bugs and scatters parsing logic.
- Immediate heavy-weight migration to a decimal library (e.g., `decimal.js` or `big.js`) — postponed in favor of integer cents (pragmatic, lower friction). A decimal library could be added later if business needs require complex decimal math (taxes, discounts, currencies with sub-cent rounding rules).
- Moving all IO and normalization out of `App.tsx` into services immediately — partially addressed (normalization added) but full extraction to testable service modules remains for next steps.

3) Key technical tradeoffs
-------------------------
- Money representation:
  - Chosen: `amountCents: number` (integer cents).
  - Pros: avoids floating point math problems, simplifies arithmetic, easy to test.
  - Cons: requires converting to/from API shapes; fractional-cent business rules need care; may need a decimal lib for advanced requirements.

- Migration strategy (ad-hoc normalization in `App.tsx`):
  - Chosen: normalize incoming network/store data inside `App.tsx` effects so code keeps working immediately.
  - Pros: fast path to compatibility; tests still pass.
  - Cons: mixes parsing/IO with UI lifecycle, reduces testability and violates single-responsibility for `App.tsx`.

- Navigation and routing state:
  - Chosen: serializable `ScreenState` that carries `productId`.
  - Pros: lightweight, serializable, safer for persistence, easier to reason about.
  - Cons: view-layer needs to lookup the full `Product` object when rendering, which can be stale or missing if data isn't available.

- Persistence and side effects:
  - Current approach: `AsyncStorage` used directly inside `useEffect` hooks.
  - Tradeoff: simple to implement, but harder to unit test and more susceptible to race conditions; a wrapper/service would improve testability.

4) What I would improve with more time
--------------------------------------
- Extract IO and parsing into small services and custom hooks:
  - `storage.ts` (wrapper around `AsyncStorage` that can be mocked) and `productsService.ts` (fetch + normalize) to isolate side effects.
- Add schema validation and versioned migrations:
  - Use `zod` or `io-ts` to validate and migrate stored/network payloads. Store a persistence schema version and run migrations when formats change.
- Add comprehensive tests:
  - Unit tests for `money` helpers and normalization.
  - Unit tests for newly created reducers (if extracting state to `useReducer`) and services.
  - Integration tests that mock `AsyncStorage` and `fetch` to validate hydration and persistence flows.
- Consider decimal library for financial-computation correctness if the business domain requires fractional-cent rounding and complex calculations (tax/discount composition).
- Add batching/debounce on `AsyncStorage.setItem` calls for cart persistence to reduce IO on frequent updates.

5) Files changed in this session
--------------------------------
- cart.ts
- formatMoney.ts
- money.ts (new)
- __tests__/cart.test.ts
- screens/CartScreen.tsx
- App.tsx
- navigation.ts (new)
- README.md
- AI_USAGE_DECISION_LOG.md (this file)

If you'd like, I can proceed to extract the storage wrapper and small services next, add unit tests for them, and add a migration/version field to persisted state.
