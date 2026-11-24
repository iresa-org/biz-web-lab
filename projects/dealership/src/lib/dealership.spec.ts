import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dealership } from './dealership';
import { provideRouter } from '@angular/router';

describe('Dealership', () => {
  let fixture: ComponentFixture<Dealership>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dealership],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Dealership);
    await fixture.whenStable();
  });

  it('combines body style and price filters and recovers from an empty result', async () => {
    const element: HTMLElement = fixture.nativeElement;
    element.querySelector<HTMLButtonElement>('.biz-filters button:last-child')?.click();
    element.querySelector<HTMLButtonElement>('.budget-filter')?.click();
    await fixture.whenStable();
    expect(element.querySelectorAll('.business-card')).toHaveLength(0);
    expect(element.querySelector('.empty-state')?.textContent).toContain('No demo vehicles match');
    element.querySelector<HTMLButtonElement>('.empty-state button')?.click();
    await fixture.whenStable();
    expect(element.querySelectorAll('.business-card')).toHaveLength(3);
    expect(element.querySelector('.budget-filter')?.getAttribute('aria-pressed')).toBe('false');
  });

  it('shows vehicle details with a clearly simulated test-drive request', async () => {
    const element: HTMLElement = fixture.nativeElement;
    const dialog = element.querySelector('dialog')!;
    dialog.showModal = vi.fn();
    const vehicles = element.querySelectorAll<HTMLButtonElement>('.business-card button');
    for (const button of vehicles) {
      expect(button.getAttribute('aria-label')).toContain('View vehicle');
    }
    vehicles[0].click();
    await fixture.whenStable();
    expect(dialog.querySelector('h2')?.textContent).toBe('Meridian Touring');
    dialog.querySelector<HTMLButtonElement>(':scope > .biz-button')?.click();
    await fixture.whenStable();
    expect(dialog.querySelector('[role="status"]')?.textContent).toContain('Nothing has been sent');
    vehicles[1].click();
    await fixture.whenStable();
    expect(dialog.querySelector('h2')?.textContent).toBe('Atlas Ridge');
    expect(dialog.querySelector('[role="status"]')?.textContent?.trim()).toBe('');
    expect(dialog.querySelector<HTMLButtonElement>(':scope > .biz-button')?.disabled).toBe(false);
  });
});
