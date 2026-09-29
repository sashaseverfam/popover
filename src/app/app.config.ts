import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { providePopoverConfig } from '@severfam/popover';
import { routes } from './app.routes';
import { componentStateFeature } from './state/component-state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideState(componentStateFeature),
    provideStoreDevtools({
      maxAge: 25,
      name: 'AngularPopover',
      logOnly: !isDevMode(),
    }),
    providePopoverConfig({
      position: 'auto',
      animation: 'zoom',
      labels: {
        ok: 'Понятно',
        closeAria: 'Закрыть окно',
      },
      theme: {
        panelBg: '#ffffff',
        panelBorder: '1px solid #e2e8f0',
        panelRadius: '12px',
        panelShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)',
        animationDuration: 300,
        animationTiming: 'cubic-bezier(0.16, 1, 0.3, 1)',
        textColor: '#1e293b',
        accentColor: '#2563eb',
        iconColor: '#94a3b8',
        iconHoverColor: '#2563eb',
        fontSize: '13px',
      },
    }),
  ],
};

