# Khabar React Native App

System-first React Native architecture using Expo + TypeScript.

## Stack

- Expo (React Native)
- TypeScript
- React Navigation
- Axios
- Zustand
- React Hook Form
- Zod

## Run

```bash
npm install
npm run start
```

## Quality

```bash
npm run typecheck
```

## Folder Structure

```text
src/
|-- assets/
|-- components/
|   |-- ui/
|   `-- layout/
|-- features/
|   |-- auth/
|   |-- cook/
|   |-- customer/
|   `-- subscription/
|-- screens/
|-- navigation/
|-- services/
|-- store/
|-- hooks/
|-- utils/
|-- constants/
|-- types/
`-- config/
```

## Design System

`src/constants/colors.ts` contains the strict core palette:

- primary: #1B4332
- background: #F7F7F7
- white: #FFFFFF
- black: #111111
- gray: #888888

Spacing and radius tokens are in `src/constants/spacing.ts` and `src/constants/radius.ts`.

## Architecture Rules

- No random folders outside the defined structure.
- No inline styles.
- Build reusable components in `src/components/ui`.
- No hardcoded style values when a token can be used.
- Use TypeScript types from `src/types`.
- Route all API calls through `src/services`.
- Use Zustand for global state in `src/store`.
- Keep screen components clean; move logic to hooks/services/features.
- Separate UI and business logic.

## Feature Workflow

1. Add or reuse domain types in `src/types`.
2. Implement API client/service functions in `src/services`.
3. Add feature hooks and logic in `src/features/<feature>` and `src/hooks`.
4. Keep presentational pieces reusable in `src/components`.
5. Compose screen-level behavior in `src/screens`.

## Existing Examples

- Reusable UI:
  - `src/components/ui/Button.tsx`
  - `src/components/ui/TextInputField.tsx`
  - `src/components/ui/Card.tsx`
- Navigation:
  - `src/navigation/AppNavigator.tsx`
- Service layer:
  - `src/services/api.ts`
  - `src/services/cookService.ts`
- Zustand store:
  - `src/store/useAuthStore.ts`
- Form handling (React Hook Form + Zod):
  - `src/features/auth/useLoginForm.ts`
  - `src/features/auth/LoginForm.tsx`
