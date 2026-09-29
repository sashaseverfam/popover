import {
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  inject,
  input,
} from '@angular/core';
import { ClickOutsideService } from '../services/click-outside.service';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  readonly clickOutsideIgnoreSelector = input('');

  @Output() readonly clickOutside = new EventEmitter<MouseEvent>();

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly clickOutsideService = inject(ClickOutsideService);
  private registrationId: symbol | null = null;

  constructor() {
    const element = this.elementRef.nativeElement;

    this.registrationId = this.clickOutsideService.register(
      element,
      () => this.clickOutsideIgnoreSelector(),
      (event) => this.clickOutside.emit(event),
    );

    inject(DestroyRef).onDestroy(() => {
      if (this.registrationId !== null) {
        this.clickOutsideService.unregister(this.registrationId);
      }
    });
  }
}
