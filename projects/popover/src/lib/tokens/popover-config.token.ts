import { InjectionToken, Provider } from '@angular/core';
import { PopoverConfig } from '../interfaces/popover-config.interface';

export const DEFAULT_POPOVER_CONFIG: PopoverConfig = {
  position: 'auto',
  multi: false,
  okClose: false,
  closeOnOutsideClick: true,
  closeOnEscape: true,
  animation: 'fade',
  labels: {
    ok: 'ok',
    closeAria: 'Закрыть',
  },
  theme: {
    panelBg: '#ffffff',
    panelBorder: 'none',
    panelRadius: '9px',
    panelShadow: '0 0 7px 0 rgba(0, 0, 0, 0.2)',
    animationDuration: '300ms',
    animationTiming: 'cubic-bezier(0.16, 1, 0.3, 1)',
    textColor: '#4c5569',
    accentColor: '#e53935',
    iconColor: '#a5adbb',
    iconHoverColor: '#e53935',
    fontSize: '12px',
    bodyMaxHeight: '265px',
    zIndex: 1,
  },
};

export const POPOVER_CONFIG = new InjectionToken<PopoverConfig>('POPOVER_CONFIG');

export function providePopoverConfig(config: PopoverConfig): Provider {
  return {
    provide: POPOVER_CONFIG,
    useValue: config,
  };
}
