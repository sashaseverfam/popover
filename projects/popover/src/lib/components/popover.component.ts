import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { PopoverThemeConfig } from '../interfaces/popover-config.interface';
import { PopoverStore } from '../store/popover.store';
import { DEFAULT_POPOVER_CONFIG, POPOVER_CONFIG } from '../tokens/popover-config.token';
import { FocusTrap } from '../services/focus-trap';
import {
  PopoverAnimation,
  PopoverPosition,
  PopoverResponsiveWidth,
  PopoverSize,
  PopoverWidth,
} from '../types/popover.types';

function toSize(v: string | number | undefined): string | undefined {
  if (v === undefined || v === null || v === '') return undefined;
  return typeof v === 'number' ? `${v}px` : String(v);
}

function toDuration(v: string | number | undefined): string | undefined {
  if (v === undefined || v === null || v === '') return undefined;
  return typeof v === 'number' ? `${v}ms` : String(v);
}

@Component({
  selector: 'popover',
  imports: [ClickOutsideDirective],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FocusTrap],
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class PopoverComponent implements AfterViewInit, OnDestroy {
  private readonly popoverStore = inject(PopoverStore);
  private readonly globalConfig = inject(POPOVER_CONFIG, { optional: true });
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly renderer = inject(Renderer2);
  private readonly focusTrap = inject(FocusTrap);
  private previousThemeHash = '';

  readonly uid = input.required<string>();
  readonly title = input('');
  readonly multi = input<boolean | undefined>(undefined);
  readonly position = input<PopoverPosition | undefined>(undefined);
  readonly size = input<PopoverSize | undefined>(undefined);
  readonly width = input<PopoverWidth | undefined>(undefined);
  readonly minWidth = input<string | number | undefined>(undefined);
  readonly maxWidth = input<string | number | undefined>(undefined);
  readonly okClose = input<boolean | undefined>(undefined);
  readonly closeOnOutsideClick = input<boolean | undefined>(undefined);
  readonly closeOnEscape = input<boolean | undefined>(undefined);
  readonly animation = input<PopoverAnimation | undefined>(undefined);
  readonly animationDuration = input<string | number | undefined>(undefined);
  readonly animationTiming = input<string | undefined>(undefined);
  readonly okLabel = input<string | undefined>(undefined);
  readonly closeAriaLabel = input<string | undefined>(undefined);
  readonly theme = input<PopoverThemeConfig | undefined>(undefined);

  readonly ariaLabel = input<string | undefined>(undefined);

  readonly zIndex = input<number | undefined>(undefined);

  protected readonly isOpened = computed(() => this.popoverStore.isOpen(this.uid()));
  protected readonly isClosing = signal(false);
  protected readonly panelVisible = computed(() => this.isOpened() || this.isClosing());

  protected readonly effectivePosition = computed<PopoverPosition>(
    () =>
      this.position() ??
      this.globalConfig?.position ??
      DEFAULT_POPOVER_CONFIG.position ??
      'auto',
  );

  protected readonly effectiveSize = computed<PopoverSize | undefined>(
    () => this.size() ?? this.globalConfig?.size ?? DEFAULT_POPOVER_CONFIG.size,
  );

  protected readonly effectiveMulti = computed<boolean>(
    () => this.multi() ?? this.globalConfig?.multi ?? DEFAULT_POPOVER_CONFIG.multi ?? false,
  );

  protected readonly effectiveOkClose = computed<boolean>(
    () =>
      this.okClose() ?? this.globalConfig?.okClose ?? DEFAULT_POPOVER_CONFIG.okClose ?? false,
  );

  protected readonly effectiveAnimation = computed<PopoverAnimation>(
    () =>
      this.animation() ??
      this.globalConfig?.animation ??
      DEFAULT_POPOVER_CONFIG.animation ??
      'fade',
  );

  protected readonly effectiveCloseOnOutsideClick = computed<boolean>(
    () =>
      this.closeOnOutsideClick() ??
      this.globalConfig?.closeOnOutsideClick ??
      DEFAULT_POPOVER_CONFIG.closeOnOutsideClick ??
      true,
  );

  protected readonly effectiveCloseOnEscape = computed<boolean>(
    () =>
      this.closeOnEscape() ??
      this.globalConfig?.closeOnEscape ??
      DEFAULT_POPOVER_CONFIG.closeOnEscape ??
      true,
  );

  protected readonly effectiveOkLabel = computed<string>(
    () =>
      this.okLabel() ??
      this.globalConfig?.labels?.ok ??
      DEFAULT_POPOVER_CONFIG.labels?.ok ??
      'ok',
  );

  protected readonly effectiveCloseAriaLabel = computed<string>(
    () =>
      this.closeAriaLabel() ??
      this.globalConfig?.labels?.closeAria ??
      DEFAULT_POPOVER_CONFIG.labels?.closeAria ??
      'Закрыть',
  );

  protected readonly effectiveAriaLabel = computed<string>(
    () =>
      this.ariaLabel() ??
      this.title() ??
      this.globalConfig?.labels?.dialogAria ??
      '',
  );

  protected readonly effectiveZIndex = computed<number>(
    () =>
      this.zIndex() ??
      this.globalConfig?.theme?.zIndex ??
      DEFAULT_POPOVER_CONFIG.theme?.zIndex ??
      1,
  );

  protected readonly outsideIgnoreSelector = '[clickOutside]';

  private readonly panelRef = signal<HTMLElement | null>(null);

  ngAfterViewInit(): void {
    this.applyThemeFromInputs();
  }

  constructor() {
    effect(() => {
      this.applyThemeFromInputs();
    });
  }

  ngOnDestroy(): void {
    this.popoverStore.remove(this.uid());
  }

  onPanelCreated(element: EventTarget): void {
    const panelEl = element as HTMLElement;
    this.panelRef.set(panelEl);
    this.cdr.detectChanges();
    this.focusTrap.activate(panelEl);
  }

  protected toggle(): void {
    const wasOpened = this.isOpened();
    this.popoverStore.toggle(this.uid(), this.effectiveMulti());

    if (wasOpened) {
      this.startCloseAnimation();
    } else {
      this.isClosing.set(false);
    }
  }

  protected close(): void {
    if (!this.isOpened()) return;

    this.popoverStore.close(this.uid());
    this.startCloseAnimation();
  }

  protected onClickOutside(): void {
    if (this.isOpened() && this.effectiveCloseOnOutsideClick()) {
      this.close();
    }
  }

  protected onEscape(): void {
    if (this.isOpened() && this.effectiveCloseOnEscape()) {
      this.close();
    }
  }

  private startCloseAnimation(): void {
    const duration = this.getAnimationDurationMs();
    if (duration <= 0 || this.effectiveAnimation() === 'none') {
      this.finishClose();
      return;
    }

    this.isClosing.set(true);
    this.cdr.detectChanges();

    setTimeout(() => this.finishClose(), duration);
  }

  private finishClose(): void {
    this.isClosing.set(false);
    this.focusTrap.deactivate();
    this.cdr.detectChanges();
  }

  private getAnimationDurationMs(): number {
    const raw =
      this.animationDuration() ??
      this.globalConfig?.theme?.animationDuration ??
      DEFAULT_POPOVER_CONFIG.theme?.animationDuration ??
      300;

    if (typeof raw === 'number') return raw;

    const match = String(raw).match(/^([\d.]+)\s*(ms|s)$/);
    if (!match) return 300;

    const value = parseFloat(match[1]);
    return match[2] === 's' ? value * 1000 : value;
  }

  private applyThemeFromInputs(): void {
    const merged: PopoverThemeConfig = {
      ...DEFAULT_POPOVER_CONFIG.theme,
      ...this.globalConfig?.theme,
      ...this.theme(),
    };

    const w = this.width() ?? this.globalConfig?.width;
    if (w !== undefined) {
      if (typeof w === 'object') {
        const r = w as PopoverResponsiveWidth;
        if (r.default !== undefined) merged.panelWidth = r.default;
        if (r.mobile !== undefined) merged.panelMobileWidth = r.mobile;
      } else {
        merged.panelWidth = w;
      }
    }

    const minW = this.minWidth() ?? this.globalConfig?.minWidth;
    if (minW !== undefined) merged.panelMinWidth = minW;

    const maxW = this.maxWidth() ?? this.globalConfig?.maxWidth;
    if (maxW !== undefined) merged.panelMaxWidth = maxW;

    const duration = this.animationDuration();
    if (duration !== undefined) merged.animationDuration = duration;

    const timing = this.animationTiming();
    if (timing !== undefined) merged.animationTiming = timing;

    const zIdx = this.zIndex();
    if (zIdx !== undefined) merged.zIndex = zIdx;

    const hash = JSON.stringify(merged);
    if (hash === this.previousThemeHash) return;
    this.previousThemeHash = hash;

    this.applyTheme(merged);
  }

  private applyTheme(t: PopoverThemeConfig): void {
    const s = this.elementRef.nativeElement.style;
    if (t.panelBg) s.setProperty('--popover-panel-bg', t.panelBg);
    if (t.panelBorder) s.setProperty('--popover-panel-border', t.panelBorder);
    if (t.panelRadius) s.setProperty('--popover-panel-radius', t.panelRadius);
    if (t.panelShadow) s.setProperty('--popover-panel-shadow', t.panelShadow);

    const w = toSize(t.panelWidth);
    if (w) s.setProperty('--popover-panel-width', w);

    const mw = toSize(t.panelMobileWidth);
    if (mw) s.setProperty('--popover-panel-mobile-width', mw);

    const minW = toSize(t.panelMinWidth);
    if (minW) s.setProperty('--popover-panel-min-width', minW);

    const maxW = toSize(t.panelMaxWidth);
    if (maxW) s.setProperty('--popover-panel-max-width', maxW);

    const duration = toDuration(t.animationDuration);
    if (duration) s.setProperty('--popover-animation-duration', duration);
    if (t.animationTiming) s.setProperty('--popover-animation-timing', t.animationTiming);

    if (t.textColor) s.setProperty('--popover-text-color', t.textColor);
    if (t.accentColor) s.setProperty('--popover-accent-color', t.accentColor);
    if (t.iconColor) s.setProperty('--popover-icon-color', t.iconColor);
    if (t.iconHoverColor) s.setProperty('--popover-icon-hover-color', t.iconHoverColor);
    if (t.fontSize) s.setProperty('--popover-font-size', t.fontSize);
    if (t.bodyMaxHeight) s.setProperty('--popover-body-max-height', t.bodyMaxHeight);

    if (t.zIndex !== undefined) s.setProperty('--popover-z-index', String(t.zIndex));
  }
}
