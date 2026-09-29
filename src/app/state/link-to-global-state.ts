import { DestroyRef, Injector, Signal, isSignal, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateComponentState } from './component-state';

export function linkToGlobalState<S extends object>(
  componentState: Signal<S> | Observable<S>,
  componentName: string,
  globalStore: Store,
): void {
  const injector = inject(Injector);

  const componentState$: Observable<S> = isSignal(componentState)
    ? toObservable(componentState, { injector })
    : componentState;

  componentState$
    .pipe(takeUntilDestroyed(injector.get(DestroyRef)))
    .subscribe((state) => {
      globalStore.dispatch(
        updateComponentState({ componentName, componentState: state }),
      );
    });
}
