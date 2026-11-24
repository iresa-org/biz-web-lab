import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Restaurant } from './restaurant';
import { provideRouter } from '@angular/router';

describe('Restaurant', () => {
  let fixture: ComponentFixture<Restaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Restaurant],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Restaurant);
    await fixture.whenStable();
  });

  it('filters the sample menu by category', async () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('.business-card')).toHaveLength(3);
    element
      .querySelector<HTMLButtonElement>('#restaurant-menu .biz-filters button:nth-child(2)')
      ?.click();
    await fixture.whenStable();
    expect(element.querySelectorAll('.business-card')).toHaveLength(1);
    expect(element.querySelector('.card-title')?.textContent).toContain('The garden bowl');
  });

  it('confirms only a demo reservation and resets the confirmation when reopened', async () => {
    const element: HTMLElement = fixture.nativeElement;
    const dialog = element.querySelector('dialog')!;
    dialog.showModal = vi.fn();
    element.querySelector<HTMLButtonElement>('.business-nav button')?.click();
    dialog.querySelector<HTMLButtonElement>('fieldset:first-of-type button:nth-child(2)')?.click();
    dialog.querySelector<HTMLButtonElement>('fieldset:last-of-type button:nth-child(3)')?.click();
    await fixture.whenStable();
    dialog.querySelector<HTMLButtonElement>(':scope > .biz-button')?.click();
    await fixture.whenStable();
    expect(dialog.querySelector('[role="status"]')?.textContent).toContain('4 guests at 7:30 PM');
    expect(dialog.querySelector('[role="status"]')?.textContent).toContain(
      'No real table has been booked',
    );
    element.querySelector<HTMLButtonElement>('.business-nav button')?.click();
    await fixture.whenStable();
    expect(dialog.querySelector('[role="status"]')?.textContent?.trim()).toBe('');
    expect(dialog.querySelectorAll('fieldset')).toHaveLength(2);
  });
});
