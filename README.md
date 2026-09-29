# AngularPopover

Angular 22 workspace with a `popover` library and a demo application.

## Structure

| Path               | Description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `projects/popover` | Library: `popover` component, `clickOutside` directive, `PopoverStore` (signals).                    |
| `src`              | Demo application with popover usage examples.                                                        |
| `src/app/state`    | Integration of popover state with `@ngrx/store` (Redux DevTools).                                    |

## Quick Start

```bash
npm install
npm run build:lib   # build the library into dist/popover (required before running the app)
npm start           # dev-server at http://localhost:4200/
```

## Commands

| Command            | Description                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| `npm run build:lib` | Build the library into `dist/popover`.                                           |
| `npm start`         | Build the library + start the app dev-server (`http://localhost:4200/`).          |
| `npm run build`     | Build the library + production build of the app into `dist/angular-popover`.     |
| `npm test`          | Build the library + run unit tests (Vitest) for all projects.                    |
| `ng test popover`   | Run library tests only.                                                          |
| `ng test angular-popover` | Run app tests only.                                                         |

The app imports the library via the path alias `popover` -> `dist/popover`
(see `tsconfig.json`), so the library must be rebuilt after changes.
The npm scripts `start`/`build`/`test` handle this automatically.

## Library Documentation

API docs, slots, modes, and open behaviors — see `projects/popover/README.md`.

## Redux DevTools

Popover state is synced to the global `@ngrx/store` via the `updateComponentState` action
through the `linkToGlobalState` helper (`src/app/state/`), so it is visible
in the Redux DevTools extension under `componentState['libs/PopoverState']`.
DevTools are configured in `src/app/app.config.ts` via `provideStoreDevtools`
(set to `logOnly` in production builds).
