import { Injectable, NgZone, inject } from '@angular/core';

export type ClickOutsideCallback = (event: MouseEvent) => void;

export type IgnoreSelectorGetter = () => string;

interface ClickOutsideEntry {
  readonly element: HTMLElement;
  readonly getIgnoreSelector: IgnoreSelectorGetter;
  readonly callback: ClickOutsideCallback;
}

@Injectable({ providedIn: 'root' })
export class ClickOutsideService {
  private readonly zone = inject(NgZone);
  private readonly entries = new Map<symbol, ClickOutsideEntry>();
  private listenerAttached = false;

  register(
    element: HTMLElement,
    getIgnoreSelector: IgnoreSelectorGetter,
    callback: ClickOutsideCallback,
  ): symbol {
    const id = Symbol('clickOutside');

    this.entries.set(id, { element, getIgnoreSelector, callback });
    this.ensureListener();

    return id;
  }

  unregister(id: symbol): void {
    this.entries.delete(id);
  }

  private ensureListener(): void {
    if (this.listenerAttached) return;
    this.listenerAttached = true;

    const handler = (event: MouseEvent): void => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      for (const entry of this.entries.values()) {
        if (entry.element.contains(target)) continue;

        const ignoreSelector = entry.getIgnoreSelector();
        if (ignoreSelector && target.closest(ignoreSelector)) continue;

        entry.callback(event);
      }
    };

    this.zone.runOutsideAngular(() => {
      document.addEventListener('click', handler);
    });
  }
}
