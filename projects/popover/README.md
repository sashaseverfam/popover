# Popover

Angular 22 popover library (standalone component, signals).

## Contents

- `PopoverComponent` (`popover`) — popover with arbitrary content;
- `ClickOutsideDirective` (`[clickOutside]`) — emits `clickOutside` event when clicking outside the host element;
- `PopoverStore` — shared popover state store (`uid` -> open/closed);
- `PopoverState` — store state interface;
- `PopoverPosition`, `PopoverSize`, `PopoverStateMap` — types.

## Structure

```text
projects/popover/src
├── lib
│   ├── components   — components (`popover.component.*`)
│   ├── directives   — directives (`click-outside.directive.ts`)
│   ├── interfaces   — interfaces (`popover-state.interface.ts`)
│   ├── services     — services (`click-outside.service.ts`, `focus-trap.ts`)
│   ├── store        — store (`popover.store.ts`)
│   └── types        — types (`popover.types.ts`)
└── public-api.ts    — public API of the library
```

## Usage

```ts
import { PopoverComponent } from '@severfam/popover';
```

```html
<popover uid="rate-hint" title="Tooltip" position="auto-bottom" [okClose]="true">
  <span class="popover__toggle-content">What is this amount?</span>
  <span class="popover__header-content">Terms &amp; conditions</span>
  <span class="popover__body-content">Tooltip text.</span>
</popover>
```

### Inputs

| Input      | Type                                                                         | Default                        | Description                                                                  |
| ---------- | ---------------------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `uid`      | `string` (required)                                                          | —                              | Unique popover identifier in `PopoverStore`.                                  |
| `title`    | `string`                                                                     | `''`                           | Popover title.                                                                |
| `position` | `'auto' \| 'auto-bottom' \| 'top' \| 'top-bottom' \| 'right' \| 'right-top' \| 'right-bottom' \| 'left' \| 'left-top' \| 'left-bottom' \| 'bottom'` | from config (`'auto'`) | Popover position relative to the trigger. |
| `size`     | `'xs' \| 'xxs'`                                                              | from config                    | Compact size presets.                                                          |
| `width`    | `string \| number \| { default?: string \| number, mobile?: string \| number }` | from config              | Custom or responsive width (e.g. `420`, `'420px'`, `{ default: '540px', mobile: '280px' }`). |
| `minWidth` | `string \| number`                                                           | from config (`200px`)          | Minimum panel width.                                                           |
| `maxWidth` | `string \| number`                                                           | from config (`500px`)          | Maximum panel width.                                                           |
| `multi`    | `boolean`                                                                    | from config (`false`)          | Allow multiple popovers to stay open.                                          |
| `okClose`  | `boolean`                                                                    | from config (`false`)          | Show confirm button in the footer.                                             |
| `closeOnOutsideClick` | `boolean`                                                            | from config (`true`)           | Close on click outside the popover.                                            |
| `closeOnEscape` | `boolean`                                                              | from config (`true`)           | Close on Escape key.                                                           |
| `animation`| `'fade' \| 'zoom' \| 'slide' \| 'none'`                                      | from config (`'fade'`)         | Panel appearance animation.                                                    |
| `animationDuration` | `string \| number`                                                    | from config (`300ms`)          | Animation duration: number in ms (`600`) or string (`'0.4s'`).                |
| `animationTiming` | `string`                                                              | from config (`'cubic-bezier(0.16, 1, 0.3, 1)'`) | CSS timing-function (easing) for the animation. |
| `okLabel`  | `string`                                                                     | from config (`'ok'`)           | Confirm button text.                                                           |
| `closeAriaLabel` | `string`                                                                | from config (`'Закрыть'`)      | Aria-label for the close button.                                               |
| `ariaLabel`| `string`                                                                     | from config                    | Custom `aria-label` for the dialog. Falls back to `title`.                     |
| `zIndex`   | `number`                                                                     | from config (`1`)              | `z-index` of the popover panel.                                                |
| `theme`    | `PopoverThemeConfig`                                                         | from config                    | Local theme override (colors, border, shadow, radius).                          |

### Slots (ng-content)

Slots use marker classes (no styles needed — classes are used for selection only):

| Selector                   | Purpose                                                                |
| -------------------------- | ---------------------------------------------------------------------- |
| `.popover__toggle-content` | Custom trigger. If empty, a standard "?" icon is rendered.              |
| `.popover__header-content` | Additional title content.                                               |
| `.popover__body-content`   | Popover body content.                                                   |
| `.popover__footer-content` | Custom footer content.                                                  |

### Open Behaviors

1. Click the standard "?" icon (when trigger slot is empty).
2. Click a custom trigger from the `.popover__toggle-content` slot.
3. Keyboard: `Enter` / `Space` on the trigger.
4. Programmatically via `PopoverStore` (see below).

Close: repeat click on trigger, click outside, `Escape`, close button, or "ok" button.

### Programmatic Control

```ts
import { PopoverStore } from '@severfam/popover';

export class SomeComponent {
  private readonly popoverStore = inject(PopoverStore);

  open(): void {
    this.popoverStore.open('rate-hint');
  }

  toggle(): void {
    this.popoverStore.toggle('rate-hint');
  }

  close(): void {
    this.popoverStore.close('rate-hint');
  }

  closeAll(): void {
    this.popoverStore.reset();
  }
}
```

Store signals: `state()` (full state as `PopoverState`) and `popovers()` (map `uid` -> open/closed).
Methods: `isOpen(uid)`, `open(uid, multi?)`, `close(uid)`, `toggle(uid, multi?)`, `patch(map)`, `reset()`, `remove(uid)`.

## Class Migration

Classes have been unified under the `popover` block — mapping from old names:

| Old                                | New                             |
| ----------------------------------- | ------------------------------- |
| `.state-helper`                     | `.popover`                      |
| `.state-helper__toggle`             | `.popover__trigger`             |
| `.state-helper__help-icon`          | `.popover__icon`                |
| `.state-popover`                    | `.popover__panel`               |
| `.state-popover--{...}`             | `.popover__panel--{...}`        |
| `.state-popover-header`             | `.popover__header`              |
| `.state-popover-body`               | `.popover__body`                |
| `.state-popover-footer`             | `.popover__footer`              |
| `.state-popover__close-btn`         | `.popover__close`               |
| `.state-popover__close-ok`          | `.popover__ok`                  |
| slot `.state-popover__toggle`       | slot `.popover__toggle-content` |
| slot `.state-popover-body__header`  | slot `.popover__header-content` |
| slot `.state-popover-body__content` | slot `.popover__body-content`   |

CSS variables: `--popover-bg` → `--popover-panel-bg`, `--popover-radius` →
`--popover-panel-radius`, `--popover-shadow` → `--popover-panel-shadow`, `--popover-color` →
`--popover-text-color`; `--popover-accent-color`, `--popover-muted-color` and
`--popover-body-max-height` — unchanged.

## Redux DevTools

The library has no `@ngrx/*` dependency. To see popover state in Redux DevTools,
connect the `PopoverStore.state` signal to a global store — see the demo app
(`src/app/state/component-state.ts` and `src/app/state/link-to-global-state.ts`):

```ts
// app.config.ts
provideStore(),
provideState(componentStateFeature),
provideStoreDevtools({ maxAge: 25, name: 'AngularPopover', logOnly: !isDevMode() }),

// component / service
linkToGlobalState(this.popoverStore.state, 'libs/PopoverState', this.globalStore);
```

Every state change is dispatched via `updateComponentState` action and appears
under `componentState['libs/PopoverState']`.

## Global Configuration (`providePopoverConfig`)

Like Angular Material / Alerts, defaults can be configured once in `app.config.ts`:

```ts
import { providePopoverConfig } from '@severfam/popover';

export const appConfig: ApplicationConfig = {
  providers: [
    providePopoverConfig({
      position: 'auto-bottom',
      animation: 'zoom', // 'fade' | 'zoom' | 'slide' | 'none'
      closeOnOutsideClick: true,
      closeOnEscape: true,
      labels: {
        ok: 'Got it',
        closeAria: 'Close tooltip',
      },
      theme: {
        panelBg: '#ffffff',
        panelBorder: '1px solid #e2e8f0',
        panelRadius: '12px',
        panelShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12)',
        textColor: '#1e293b',
        accentColor: '#2563eb',
        iconColor: '#94a3b8',
        iconHoverColor: '#2563eb',
        fontSize: '13px',
      },
    }),
  ],
};
```

Any config parameter can be overridden on a specific component via the corresponding input (`position`, `animation`, `theme`, `okLabel`, etc.).

## Theming

Theming is available in three ways:
1. **Globally via TS config**: `providePopoverConfig({ theme: { ... } })`.
2. **Locally via input**: `<popover [theme]="{ panelBg: '#0f172a', ... }">`.
3. **Via CSS variables** on the `popover` element or higher:

| Variable                    | Default                        | Purpose                               |
| --------------------------- | ------------------------------ | ------------------------------------- |
| `--popover-panel-bg`        | `#ffffff`                      | Panel and arrow background.           |
| `--popover-panel-border`    | `none`                         | Panel and arrow border.               |
| `--popover-panel-radius`    | `9px`                          | Panel corner radius.                  |
| `--popover-panel-shadow`    | `0 0 7px 0 rgba(0, 0, 0, 0.2)` | Panel shadow.                        |
| `--popover-text-color`      | `#4c5569`                      | Main text color.                      |
| `--popover-accent-color`    | `#e53935`                      | Accent: icon, close button, ok button.|
| `--popover-icon-color`      | `#a5adbb`                      | Inactive hint icon color.             |
| `--popover-icon-hover-color`| `var(--popover-accent-color)`  | Icon color on hover.                  |
| `--popover-font-size`       | `12px`                         | Base content font size.               |
| `--popover-body-max-height` | `265px`                        | Max body height with scroll.          |
| `--popover-z-index`         | `1`                            | Panel z-index.                        |

## Animations

Four panel animation variants are available (respects `prefers-reduced-motion`):
- `fade` — smooth appearance via `opacity`;
- `zoom` — appearance with soft scaling (`scale(0.92)` → `scale(1)`);
- `slide` — slide-in from above with offset (`translateY(-8px)` → `0`);
- `none` — instant appearance without animation.

### Duration and Easing

Duration and timing are set via `animationDuration` / `animationTiming`:

```html
<popover [animationDuration]="600"> ... </popover>

<popover animationDuration="1.2s" animationTiming="ease-in-out"> ... </popover>
```

Or globally in config:

```ts
providePopoverConfig({
  animation: 'zoom',
  theme: {
    animationDuration: 400,   // 400ms or string '0.4s'
    animationTiming: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
});
```

Or purely via CSS variables, without code rebuild:

```scss
popover {
  --popover-animation-duration: 500ms;
  --popover-animation-timing: ease-in-out;
}
```

Default duration is `300ms`.

## Class Structure (BEM)

Block — `popover`:

| Class                                                                 | Purpose                                                    |
| --------------------------------------------------------------------- | ---------------------------------------------------------- |
| `.popover`                                                            | Root container.                                             |
| `.popover__trigger`                                                   | Trigger (clickable wrapper).                                |
| `.popover__icon` / `.popover__icon--active`                           | Standard "?" icon and its active state.                     |
| `.popover__panel`                                                     | Popover panel.                                              |
| `.popover__panel--{auto,auto-bottom,top,top-bottom,right,right-top,right-bottom,left,left-top,left-bottom,bottom}` | Position modifiers (match `position` values). |
| `.popover__panel--{xs,xxs}`                                           | Size modifiers (match `size` values).                       |
| `.popover__panel--closing`                                            | Exit animation state.                                       |
| `.popover__panel--anim-{fade,zoom,slide,none}`                        | Animation type modifier.                                    |
| `.popover__close`                                                     | Close button (cross).                                       |
| `.popover__header`                                                    | Panel header.                                               |
| `.popover__body`                                                      | Panel body (scrollable).                                    |
| `.popover__footer`                                                    | Panel footer.                                               |
| `.popover__ok`                                                        | Confirm "ok" button.                                        |

## Build and Tests

```bash
ng build popover   # build into dist/popover
ng test popover    # unit tests (Vitest)
```
