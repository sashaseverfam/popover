import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverComponent } from './popover.component';
import { PopoverStore } from '../store/popover.store';

@Component({
  imports: [PopoverComponent],
  template: `
    <popover uid="first-popover" title="Первый popover" animation="none">
      <span class="popover__toggle-content">Первый</span>
      <span class="popover__body-content">Контент первого popover-а</span>
    </popover>

    <popover uid="second-popover" [multi]="multi" animation="none">
      <span class="popover__toggle-content">Второй</span>
      <span class="popover__body-content">Контент второго popover-а</span>
    </popover>
  `,
})
class PopoverHostComponent {
  multi = false;
}

describe('PopoverComponent', () => {
  let fixture: ComponentFixture<PopoverHostComponent>;
  let store: PopoverStore;

  const popoverElements = (): HTMLElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.popover__panel'));

  const toggleElements = (): HTMLElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.popover__trigger'));

  const clickToggle = (index = 0): void => {
    toggleElements()[index].click();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverHostComponent],
    }).compileComponents();

    store = TestBed.inject(PopoverStore);
    store.reset();

    fixture = TestBed.createComponent(PopoverHostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    store.reset();
  });

  it('рендерит popover-ы в закрытом состоянии', () => {
    expect(popoverElements().length).toBe(0);
    expect(toggleElements().length).toBe(2);
  });

  it('открывается кликом по переключателю и закрывается повторным кликом', () => {
    clickToggle();
    expect(popoverElements().length).toBe(1);

    clickToggle();
    expect(popoverElements().length).toBe(0);
  });

  it('показывает заголовок и спроецированный контент', () => {
    clickToggle();

    const popover = popoverElements()[0];
    expect(popover.querySelector('.popover__header')?.textContent).toContain('Первый popover');
    expect(popover.querySelector('.popover__body')?.textContent).toContain(
      'Контент первого popover-а'
    );
  });

  it('не показывает стандартную иконку, если переключатель спроецирован', () => {
    expect(fixture.nativeElement.querySelectorAll('.popover__icon').length).toBe(0);
  });

  it('закрывается по клику вне popover-а', () => {
    clickToggle();
    expect(popoverElements().length).toBe(1);

    document.body.click();
    fixture.detectChanges();

    expect(popoverElements().length).toBe(0);
  });

  it('не закрывается по клику внутри popover-а', () => {
    clickToggle();

    popoverElements()[0].querySelector<HTMLElement>('.popover__body')!.click();
    fixture.detectChanges();

    expect(popoverElements().length).toBe(1);
  });

  it('в режиме multi = false открытие второго popover-а закрывает первый', () => {
    clickToggle(0);
    clickToggle(1);

    const opened = popoverElements();
    expect(opened.length).toBe(1);
    expect(opened[0].querySelector('.popover__body')?.textContent).toContain(
      'Контент второго popover-а'
    );
  });

  it('в режиме multi = true оба popover-а остаются открытыми', () => {
    fixture.componentInstance.multi = true;
    fixture.detectChanges();

    clickToggle(0);
    clickToggle(1);

    expect(popoverElements().length).toBe(2);
  });

  it('открывается и закрывается программно через PopoverStore', () => {
    store.open('first-popover');
    fixture.detectChanges();
    expect(popoverElements().length).toBe(1);

    store.close('first-popover');
    fixture.detectChanges();
    expect(popoverElements().length).toBe(0);
  });

  it('закрывается по клавише Escape', () => {
    clickToggle();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(popoverElements().length).toBe(0);
  });

  it('удаляет своё состояние из хранилища при уничтожении', () => {
    store.open('first-popover');
    fixture.detectChanges();
    expect(store.isOpen('first-popover')).toBe(true);

    fixture.destroy();

    expect(store.popovers()['first-popover']).toBeUndefined();
  });

  it('кнопка закрытия (крестик) закрывает popover, а не переключает', () => {
    clickToggle();
    expect(popoverElements().length).toBe(1);

    const closeBtn = popoverElements()[0].querySelector<HTMLElement>('.popover__close')!;
    closeBtn.click();
    fixture.detectChanges();

    expect(popoverElements().length).toBe(0);
  });
});

describe('PopoverComponent (ARIA)', () => {
  let fixture: ComponentFixture<PopoverComponent>;
  let store: PopoverStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverComponent],
    }).compileComponents();

    store = TestBed.inject(PopoverStore);
    store.reset();

    fixture = TestBed.createComponent(PopoverComponent);
    fixture.componentRef.setInput('uid', 'aria-popover');
    fixture.componentRef.setInput('title', 'Заголовок');
    fixture.detectChanges();
  });

  afterEach(() => {
    store.reset();
  });

  it('имеет aria-haspopup="dialog" на триггере', () => {
    const trigger = fixture.nativeElement.querySelector('.popover__trigger');
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('имеет aria-expanded="false" когда закрыт', () => {
    const trigger = fixture.nativeElement.querySelector('.popover__trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('имеет aria-expanded="true" когда открыт', () => {
    store.open('aria-popover');
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.popover__trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('панель имеет role="dialog" и aria-modal="true"', () => {
    store.open('aria-popover');
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.popover__panel');
    expect(panel.getAttribute('role')).toBe('dialog');
    expect(panel.getAttribute('aria-modal')).toBe('true');
  });

  it('panель использует aria-label когда задан title', () => {
    store.open('aria-popover');
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.popover__panel');
    expect(panel.getAttribute('aria-label')).toBe('Заголовок');
  });

  it('кастомный aria-label переопределяет title', () => {
    fixture.componentRef.setInput('ariaLabel', 'Кастомная подпись');
    store.open('aria-popover');
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.popover__panel');
    expect(panel.getAttribute('aria-label')).toBe('Кастомная подпись');
  });

  it('panель использует aria-labelledby когда нет title и ariaLabel', () => {
    fixture.componentRef.setInput('title', '');
    store.open('aria-popover');
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.popover__panel');
    const headerId = panel.getAttribute('aria-labelledby');
    expect(headerId).toBeTruthy();

    const header = document.getElementById(headerId!);
    expect(header).not.toBeNull();
  });

  it('триггер имеет aria-controls ссылающийся на панель', () => {
    store.open('aria-popover');
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.popover__trigger');
    const panelId = trigger.getAttribute('aria-controls');
    expect(panelId).toBe('popover-panel-aria-popover');

    const panel = document.getElementById(panelId!);
    expect(panel).not.toBeNull();
  });
});

describe('PopoverComponent (z-index)', () => {
  let fixture: ComponentFixture<PopoverComponent>;
  let store: PopoverStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverComponent],
    }).compileComponents();

    store = TestBed.inject(PopoverStore);
    store.reset();

    fixture = TestBed.createComponent(PopoverComponent);
    fixture.componentRef.setInput('uid', 'z-popover');
    fixture.detectChanges();
  });

  afterEach(() => {
    store.reset();
  });

  it('z-index по умолчанию равен 1', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--popover-z-index')).toBe('1');
  });

  it('z-index переопределяется через input', () => {
    fixture.componentRef.setInput('zIndex', 999);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--popover-z-index')).toBe('999');
  });
});

describe('PopoverComponent (стандартный переключатель)', () => {
  let fixture: ComponentFixture<PopoverComponent>;

  const hostElement = (): HTMLElement => fixture.nativeElement as HTMLElement;

  const toggleElement = (): HTMLElement =>
    hostElement().querySelector<HTMLElement>('.popover__trigger')!;

  const popoverElement = (): HTMLElement | null =>
    hostElement().querySelector<HTMLElement>('.popover__panel');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverComponent],
    }).compileComponents();

    TestBed.inject(PopoverStore).reset();

    fixture = TestBed.createComponent(PopoverComponent);
    fixture.componentRef.setInput('uid', 'standalone-popover');
    fixture.componentRef.setInput('animation', 'none');
    fixture.detectChanges();
  });

  it('показывает стандартную иконку-переключатель', () => {
    expect(toggleElement().querySelector('.popover__icon')).not.toBeNull();
  });

  it('переключается с клавиатуры по Enter', () => {
    toggleElement().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(popoverElement()).not.toBeNull();

    toggleElement().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(popoverElement()).toBeNull();
  });
});

describe('PopoverComponent (слот футера)', () => {
  let fixture: ComponentFixture<PopoverComponent>;
  let store: PopoverStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverComponent],
    }).compileComponents();

    store = TestBed.inject(PopoverStore);
    store.reset();

    fixture = TestBed.createComponent(PopoverComponent);
    fixture.componentRef.setInput('uid', 'footer-popover');
    fixture.componentRef.setInput('animation', 'none');
    fixture.detectChanges();
  });

  afterEach(() => {
    store.reset();
  });

  it('footer пустой когда okClose = false и нет слота', () => {
    store.open('footer-popover');
    fixture.detectChanges();

    const footer = fixture.nativeElement.querySelector('.popover__footer');
    expect(footer!.children.length).toBe(0);
  });

  it('кнопка ok появляется при okClose = true', () => {
    fixture.componentRef.setInput('okClose', true);
    store.open('footer-popover');
    fixture.detectChanges();

    const ok = fixture.nativeElement.querySelector('.popover__ok');
    expect(ok).not.toBeNull();
  });

  it('ok кнопка закрывает popover (close, не toggle)', () => {
    fixture.componentRef.setInput('okClose', true);
    store.open('footer-popover');
    fixture.detectChanges();

    const ok = fixture.nativeElement.querySelector('.popover__ok') as HTMLElement;
    ok.click();
    fixture.detectChanges();

    expect(store.isOpen('footer-popover')).toBe(false);
  });
});
