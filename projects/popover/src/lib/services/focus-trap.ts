import { DOCUMENT, inject, Injectable } from '@angular/core';

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

@Injectable()
export class FocusTrap {
  private readonly doc = inject(DOCUMENT);
  private previouslyFocusedElement: HTMLElement | null = null;

  activate(container: HTMLElement): void {
    this.previouslyFocusedElement = this.doc.activeElement as HTMLElement;

    const firstFocusable = container.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
    firstFocusable?.focus();
  }

  deactivate(): void {
    if (this.previouslyFocusedElement && this.previouslyFocusedElement.isConnected) {
      this.previouslyFocusedElement.focus();
    }
    this.previouslyFocusedElement = null;
  }
}
