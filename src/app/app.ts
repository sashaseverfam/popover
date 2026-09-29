import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  PopoverAnimation,
  PopoverComponent,
  PopoverPosition,
  PopoverStore,
  PopoverThemeConfig,
  PopoverWidth,
} from '@severfam/popover';
import { Lang, i18n } from './i18n';
import { selectComponentStateByName } from './state/component-state';
import { linkToGlobalState } from './state/link-to-global-state';

export const POPOVER_STATE_NAME = 'libs/PopoverState';

interface PositionDemo {
  readonly uid: string;
  readonly position: PopoverPosition;
  readonly label: string;
}

interface AnimationDemo {
  readonly uid: string;
  readonly animation: PopoverAnimation;
  readonly label: string;
}

interface CustomWidthDemo {
  readonly uid: string;
  readonly title: string;
  readonly width: PopoverWidth;
  readonly minWidth?: string | number;
  readonly maxWidth?: string | number;
  readonly description: string;
}

interface ThemePresetDemo {
  readonly uid: string;
  readonly title: string;
  readonly description: string;
  readonly theme: PopoverThemeConfig;
}

interface TimingDemo {
  readonly uid: string;
  readonly timing: string;
  readonly label: string;
  readonly description: string;
}

@Component({
  selector: 'app-root',
  imports: [PopoverComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = 'Angular Popover';
  protected readonly popoverStore = inject(PopoverStore);
  private readonly globalStore = inject(Store);

  protected readonly lang = signal<Lang>('ru');

  protected readonly t = computed(() => i18n[this.lang()]);

  protected readonly popoverStateInStore = toSignal(
    this.globalStore.select(selectComponentStateByName(POPOVER_STATE_NAME)),
    { initialValue: null },
  );

  protected readonly positions = computed<readonly PositionDemo[]>(() =>
    this.t().positionLabels.map((p) => ({
      uid: p.uid,
      position: p.position as PopoverPosition,
      label: p.label,
    })),
  );

  protected readonly customWidths = computed<readonly CustomWidthDemo[]>(() =>
    this.t().widthTitles.map((w) => ({
      uid: w.uid,
      title: w.title,
      width: (() => {
        switch (w.uid) {
          case 'demo-width-responsive':
            return { default: '540px', mobile: '280px' } as const;
          case 'demo-width-fixed-string':
            return '420px';
          case 'demo-width-number':
            return 360;
          case 'demo-width-clamp':
            return '100%';
          default:
            return '420px';
        }
      })(),
      minWidth: w.uid === 'demo-width-clamp' ? 260 : undefined,
      maxWidth: w.uid === 'demo-width-clamp' ? 480 : undefined,
      description: w.description,
    })),
  );

  protected readonly animations = computed<readonly AnimationDemo[]>(() =>
    this.t().animationLabels.map((a) => ({
      uid: a.uid,
      animation: a.animation as PopoverAnimation,
      label: a.label,
    })),
  );

  protected readonly animationDuration = signal(300);
  protected readonly durationPresets: readonly number[] = [100, 300, 600, 1000, 1500];

  protected setDuration(value: number): void {
    this.animationDuration.set(value);
  }

  protected onDurationInput(event: Event): void {
    this.animationDuration.set(Number((event.target as HTMLInputElement).value));
  }

  protected readonly themePresets = computed<readonly ThemePresetDemo[]>(() =>
    this.t().themeTitles.map((tp) => ({
      uid: tp.uid,
      title: tp.title,
      description: tp.description,
      theme: THEMES[tp.uid],
    })),
  );

  protected readonly timingPresets = computed<readonly TimingDemo[]>(() =>
    this.t().timingDescriptions.map((td) => ({
      uid: td.uid,
      timing: td.timing,
      label: td.label,
      description: td.description,
    })),
  );

  protected toggleLang(): void {
    this.lang.update((l) => (l === 'ru' ? 'en' : 'ru'));
  }

  constructor() {
    linkToGlobalState(this.popoverStore.state, POPOVER_STATE_NAME, this.globalStore);
  }

  protected readonly jsonState = computed(() => JSON.stringify(this.popoverStateInStore(), null, 2));
}

const THEMES: Record<string, PopoverThemeConfig> = {
  'demo-theme-dark': {
    panelBg: '#0f172a',
    panelBorder: '1px solid #334155',
    panelRadius: '14px',
    panelShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    textColor: '#e2e8f0',
    accentColor: '#38bdf8',
    iconColor: '#64748b',
    iconHoverColor: '#38bdf8',
  },
  'demo-theme-emerald': {
    panelBg: '#f0fdf4',
    panelBorder: '2px solid #86efac',
    panelRadius: '20px',
    panelShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.2)',
    textColor: '#064e3b',
    accentColor: '#059669',
    iconColor: '#34d399',
    iconHoverColor: '#059669',
  },
  'demo-theme-sharp': {
    panelBg: '#ffffff',
    panelBorder: '2px solid #000000',
    panelRadius: '2px',
    panelShadow: '5px 5px 0px 0px #000000',
    textColor: '#000000',
    accentColor: '#dc2626',
    iconColor: '#000000',
    iconHoverColor: '#dc2626',
  },
  'demo-theme-purple': {
    panelBg: '#faf5ff',
    panelBorder: '1px solid #c084fc',
    panelRadius: '16px',
    panelShadow: '0 12px 30px -4px rgba(147, 51, 234, 0.25)',
    textColor: '#3b0764',
    accentColor: '#9333ea',
    iconColor: '#a855f7',
    iconHoverColor: '#7e22ce',
  },
  'demo-theme-amber': {
    panelBg: '#fffbeb',
    panelBorder: '1px solid #fcd34d',
    panelRadius: '8px',
    panelShadow: '0 4px 12px rgba(217, 119, 6, 0.2)',
    textColor: '#78350f',
    accentColor: '#d97706',
    iconColor: '#f59e0b',
    iconHoverColor: '#b45309',
  },
};
