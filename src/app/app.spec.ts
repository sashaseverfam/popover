import { TestBed } from '@angular/core/testing';
import { provideState, provideStore, Store } from '@ngrx/store';
import { PopoverStore } from '@severfam/popover';
import { App, POPOVER_STATE_NAME } from './app';
import { componentStateFeature, selectComponentStateByName } from './state/component-state';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideStore(), provideState(componentStateFeature)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the demo title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Angular Popover');
  });

  it('should render all demo popovers', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('popover').length).toBeGreaterThan(0);
  });

  it('should sync popover state to the global store (Redux DevTools)', async () => {
    const fixture = TestBed.createComponent(App);
    const store = TestBed.inject(Store);
    const popoverStore = TestBed.inject(PopoverStore);

    await fixture.whenStable();
    popoverStore.open('demo-basic');
    await fixture.whenStable();

    expect(store.selectSignal(selectComponentStateByName(POPOVER_STATE_NAME))()).toEqual({
      popovers: { 'demo-basic': true },
    });
  });
});
