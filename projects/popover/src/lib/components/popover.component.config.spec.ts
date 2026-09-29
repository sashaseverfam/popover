import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverStore } from '../store/popover.store';
import { providePopoverConfig } from '../tokens/popover-config.token';
import { PopoverComponent } from './popover.component';

describe('PopoverComponent (конфигурация через POPOVER_CONFIG и [theme])', () => {
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverComponent],
      providers: [
        providePopoverConfig({
          animation: 'slide',
          labels: { ok: 'Понял' },
          theme: {
            panelBg: '#1e293b',
            panelBorder: '2px solid #3b82f6',
            panelRadius: '18px',
            accentColor: '#10b981',
            animationDuration: 600,
            animationTiming: 'ease-in-out',
            zIndex: 10,
          },
        }),
      ],
    }).compileComponents();

    TestBed.inject(PopoverStore).reset();

    fixture = TestBed.createComponent(PopoverComponent);
    fixture.componentRef.setInput('uid', 'themed-popover');
    fixture.componentRef.setInput('okClose', true);
    fixture.detectChanges();
  });

  it('применяет стили темы из глобального POPOVER_CONFIG на host', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--popover-panel-bg')).toBe('#1e293b');
    expect(host.style.getPropertyValue('--popover-panel-border')).toBe('2px solid #3b82f6');
    expect(host.style.getPropertyValue('--popover-panel-radius')).toBe('18px');
    expect(host.style.getPropertyValue('--popover-accent-color')).toBe('#10b981');
  });

  it('применяет z-index из глобального конфига', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--popover-z-index')).toBe('10');
  });

  it('использует класс анимации и подпись ok из глобального конфига', () => {
    TestBed.inject(PopoverStore).open('themed-popover');
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.popover__panel') as HTMLElement;
    expect(panel.classList.contains('popover__panel--anim-slide')).toBe(true);
    expect(panel.querySelector('.popover__ok')?.textContent?.trim()).toBe('Понял');
  });

  it('применяет кастомную ширину [width] (число, строка и адаптивный объект)', () => {
    // 1. Число -> пиксели
    fixture.componentRef.setInput('width', 450);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--popover-panel-width')).toBe('450px');

    // 2. Строка
    fixture.componentRef.setInput('width', '80vw');
    fixture.detectChanges();
    expect(host.style.getPropertyValue('--popover-panel-width')).toBe('80vw');

    // 3. Адаптивный объект { default, mobile }
    fixture.componentRef.setInput('width', { default: '520px', mobile: '280px' });
    fixture.detectChanges();
    expect(host.style.getPropertyValue('--popover-panel-width')).toBe('520px');
    expect(host.style.getPropertyValue('--popover-panel-mobile-width')).toBe('280px');
  });

  it('применяет minWidth и maxWidth', () => {
    fixture.componentRef.setInput('minWidth', 200);
    fixture.componentRef.setInput('maxWidth', '700px');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--popover-panel-min-width')).toBe('200px');
    expect(host.style.getPropertyValue('--popover-panel-max-width')).toBe('700px');
  });

  it('принимает длительность анимации из глобального конфига', () => {
    const host = fixture.nativeElement as HTMLElement;
    // animationDuration: 600 (число) -> '600ms'
    expect(host.style.getPropertyValue('--popover-animation-duration')).toBe('600ms');
    expect(host.style.getPropertyValue('--popover-animation-timing')).toBe('ease-in-out');
  });

  it('input [animationDuration] переопределяет конфиг (число и строка)', () => {
    const host = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('animationDuration', 900);
    fixture.detectChanges();
    expect(host.style.getPropertyValue('--popover-animation-duration')).toBe('900ms');

    fixture.componentRef.setInput('animationDuration', '1.2s');
    fixture.detectChanges();
    expect(host.style.getPropertyValue('--popover-animation-duration')).toBe('1.2s');
  });

  it('input [animationTiming] переопределяет timing из конфига', () => {
    const host = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('animationTiming', 'linear');
    fixture.detectChanges();
    expect(host.style.getPropertyValue('--popover-animation-timing')).toBe('linear');
  });

  it('input [zIndex] переопределяет z-index из конфига', () => {
    const host = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('zIndex', 50);
    fixture.detectChanges();
    expect(host.style.getPropertyValue('--popover-z-index')).toBe('50');
  });
});
