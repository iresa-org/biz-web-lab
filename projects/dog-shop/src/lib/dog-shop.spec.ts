import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogShop } from './dog-shop';
import { provideRouter } from '@angular/router';

describe('DogShop', () => {
  let fixture: ComponentFixture<DogShop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogShop],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DogShop);
    await fixture.whenStable();
  });

  it('filters products without changing the bag', async () => {
    const element: HTMLElement = fixture.nativeElement;
    element
      .querySelector<HTMLButtonElement>('#dog-products .biz-filters button:last-child')
      ?.click();
    await fixture.whenStable();
    expect(element.querySelectorAll('.business-card')).toHaveLength(1);
    expect(element.querySelector('.card-title')?.textContent).toContain('The weekend play bundle');
    expect(element.querySelector('.business-nav button')?.textContent).toContain('Bag (0)');
  });

  it('aggregates quantities, removes lines, and clears the local bag', async () => {
    const element: HTMLElement = fixture.nativeElement;
    const add = element.querySelectorAll<HTMLButtonElement>('.business-card button');
    for (const button of add) {
      expect(button.getAttribute('aria-label')).toContain('Add to bag');
    }
    add[0].click();
    add[0].click();
    add[1].click();
    await fixture.whenStable();
    expect(element.querySelector('.business-nav button')?.textContent).toContain('Bag (3)');
    expect(element.querySelector('.bag-total strong')?.textContent).toBe('$100.00');
    expect(element.querySelector('.bag-row')?.textContent).toContain('Quantity: 2');
    element
      .querySelector<HTMLButtonElement>('[aria-label="Remove The everyday adventure kit"]')
      ?.click();
    await fixture.whenStable();
    expect(element.querySelector('.bag-total strong')?.textContent).toBe('$24.00');
    element.querySelector<HTMLButtonElement>('dialog > .biz-button')?.click();
    await fixture.whenStable();
    expect(element.querySelector('.business-nav button')?.textContent).toContain('Bag (0)');
    expect(element.querySelector('.bag-total strong')?.textContent).toBe('$0.00');
    expect(element.querySelectorAll('.bag-row')).toHaveLength(0);
  });

  it('supports all product categories and bag dialog controls', async () => {
    const element: HTMLElement = fixture.nativeElement;
    const dialog = element.querySelector('dialog')!;
    dialog.showModal = vi.fn();
    dialog.close = vi.fn();

    const categoryButtons = element.querySelectorAll<HTMLButtonElement>(
      '#dog-products .biz-filters button',
    );
    for (const button of categoryButtons) {
      button.click();
      await fixture.whenStable();
      expect(button.getAttribute('aria-pressed')).toBe('true');
    }

    categoryButtons[0].click();
    await fixture.whenStable();
    const addButtons = element.querySelectorAll<HTMLButtonElement>('.business-card button');
    for (const button of addButtons) {
      button.click();
    }
    await fixture.whenStable();
    expect(element.querySelector('.business-nav button')?.textContent).toContain('Bag (3)');
    addButtons[0].click();
    await fixture.whenStable();
    expect(element.querySelector('.business-nav button')?.textContent).toContain('Bag (4)');

    element.querySelector<HTMLButtonElement>('.business-nav button')?.click();
    expect(dialog.showModal).toHaveBeenCalledOnce();
    dialog.querySelector<HTMLButtonElement>('[aria-label="Close bag"]')?.click();
    dialog.querySelector<HTMLButtonElement>(':scope > .quiet-button')?.click();
    dialog.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    expect(dialog.close).toHaveBeenCalledTimes(3);

    const removeButtons = dialog.querySelectorAll<HTMLButtonElement>('.quiet-button');
    for (const button of Array.from(removeButtons)) {
      if (button.getAttribute('aria-label')?.startsWith('Remove ')) {
        button.click();
        await fixture.whenStable();
      }
    }
    expect(element.querySelector('.demo-status')?.textContent).toContain('removed');
  });
});
