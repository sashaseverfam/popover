import { TestBed } from '@angular/core/testing';
import { PopoverStore } from './popover.store';

describe('PopoverStore', () => {
  let store: PopoverStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(PopoverStore);
    store.reset();
  });

  it('по умолчанию не содержит открытых popover-ов', () => {
    expect(store.popovers()).toEqual({});
    expect(store.isOpen('popover')).toBe(false);
  });

  it('state() возвращает полное состояние хранилища', () => {
    store.open('popover');

    expect(store.state()).toEqual({ popovers: { popover: true } });
  });

  it('open() открывает popover', () => {
    store.open('popover');

    expect(store.isOpen('popover')).toBe(true);
  });

  it('open() c multi = false закрывает остальные popover-ы', () => {
    store.open('first');
    store.open('second');

    expect(store.isOpen('first')).toBe(false);
    expect(store.isOpen('second')).toBe(true);
  });

  it('open() c multi = true сохраняет остальные popover-ы открытыми', () => {
    store.open('first', true);
    store.open('second', true);

    expect(store.isOpen('first')).toBe(true);
    expect(store.isOpen('second')).toBe(true);
  });

  it('close() закрывает popover', () => {
    store.open('popover');
    store.close('popover');

    expect(store.isOpen('popover')).toBe(false);
  });

  it('toggle() переключает состояние popover-а', () => {
    store.toggle('popover');
    expect(store.isOpen('popover')).toBe(true);

    store.toggle('popover');
    expect(store.isOpen('popover')).toBe(false);
  });

  it('patch() частично обновляет карту состояний', () => {
    store.patch({ first: true, second: false });

    expect(store.popovers()).toEqual({ first: true, second: false });
  });

  it('reset() закрывает все popover-ы', () => {
    store.open('first', true);
    store.open('second', true);

    store.reset();

    expect(store.popovers()).toEqual({});
  });

  it('remove() удаляет popover из карты состояний', () => {
    store.open('first', true);
    store.open('second', true);

    store.remove('first');

    expect(store.popovers()['first']).toBeUndefined();
    expect(store.isOpen('second')).toBe(true);
  });

  it('isOpenSignal() возвращает реактивный сигнал', () => {
    const isOpen = store.isOpenSignal('reactive-popover');

    expect(isOpen()).toBe(false);

    store.open('reactive-popover');
    expect(isOpen()).toBe(true);

    store.close('reactive-popover');
    expect(isOpen()).toBe(false);
  });
});
