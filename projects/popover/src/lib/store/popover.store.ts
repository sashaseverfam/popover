import { Injectable, computed, signal } from '@angular/core';
import { PopoverState } from '../interfaces/popover-state.interface';
import { PopoverStateMap } from '../types/popover.types';

const initialState: PopoverState = {
  popovers: {},
};

@Injectable({ providedIn: 'root' })
export class PopoverStore {
  private readonly writableState = signal<PopoverState>({ ...initialState });

  readonly state = computed<PopoverState>(() => this.writableState());

  readonly popovers = computed<PopoverStateMap>(() => this.writableState().popovers);

  isOpen(uid: string): boolean {
    return this.writableState().popovers[uid] === true;
  }

  isOpenSignal(uid: string) {
    return computed(() => this.writableState().popovers[uid] === true);
  }

  patch(payload: PopoverStateMap): void {
    this.writableState.update((state) => ({
      ...state,
      popovers: { ...state.popovers, ...payload },
    }));
  }

  open(uid: string, multi = false): void {
    this.writableState.update((state) => ({
      ...state,
      popovers: {
        ...(multi ? state.popovers : {}),
        [uid]: true,
      },
    }));
  }

  close(uid: string): void {
    this.patch({ [uid]: false });
  }

  toggle(uid: string, multi = false): void {
    if (this.isOpen(uid)) {
      this.close(uid);
      return;
    }

    this.open(uid, multi);
  }

  reset(): void {
    this.writableState.set({ popovers: {} });
  }

  remove(uid: string): void {
    this.writableState.update((state) => {
      const popovers = { ...state.popovers };
      delete popovers[uid];

      return { ...state, popovers };
    });
  }
}
