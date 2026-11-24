import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ShowcaseCarousel } from './showcase-carousel';

describe('Showcase carousel', () => {
  async function render() {
    TestBed.configureTestingModule({ imports: [ShowcaseCarousel], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(ShowcaseCarousel);
    await fixture.whenStable();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('cycles both directions, wrapping and updating the destination', async () => {
    const { fixture, element } = await render();
    const destination = () => element.querySelector('.project-info a')?.getAttribute('href');
    const launchLink = element.querySelector<HTMLAnchorElement>('.project-info a')!;
    expect(launchLink.target).toBe('_blank');
    expect(launchLink.relList.contains('noopener')).toBe(true);
    expect(launchLink.relList.contains('noreferrer')).toBe(true);
    expect(launchLink.getAttribute('aria-label')).toContain('opens in a new tab');
    expect(launchLink.getAttribute('aria-label')).toContain('Explore the concept');
    const click = async (label: string) => {
      element.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)?.click();
      await fixture.whenStable();
    };
    expect(destination()).toBe('/restaurant');
    await click('Next project');
    expect(destination()).toBe('/dog-shop');
    expect(element.querySelector('[aria-live]')?.textContent).toContain('Dog shop');
    await click('Next project');
    expect(destination()).toBe('/dealership');
    expect(element.querySelector('.concept-caption')?.textContent).toContain('DEALERSHIP');
    expect(element.querySelector('.car-art')).not.toBeNull();
    expect(element.querySelector('.plate')).toBeNull();
    expect(element.querySelector('[aria-live]')?.textContent).toContain('03');
    await click('Next project');
    expect(destination()).toBe('/restaurant');
    await click('Previous project');
    expect(destination()).toBe('/dealership');
  });

  it('supports direct selection and arrow-key navigation', async () => {
    const { fixture, element } = await render();
    element.querySelector<HTMLButtonElement>('.project-tabs button:nth-child(3)')?.click();
    await fixture.whenStable();
    expect(element.querySelector('.project-tabs button.selected')?.textContent).toContain(
      'Dealership',
    );
    element
      .querySelector('#showcase')
      ?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await fixture.whenStable();
    expect(element.querySelector('.project-info a')?.getAttribute('href')).toBe('/restaurant');
    expect(element.querySelector('.project-tabs button')?.getAttribute('aria-pressed')).toBe(
      'true',
    );
    for (const button of element.querySelectorAll<HTMLButtonElement>('.project-tabs button')) {
      button.click();
      await fixture.whenStable();
    }
    for (const button of element.querySelectorAll<HTMLButtonElement>('.dots button')) {
      button.click();
      await fixture.whenStable();
    }

    const showcase = element.querySelector('#showcase')!;
    showcase.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }),
    );
    await fixture.whenStable();
    expect(element.querySelector('.project-info a')?.getAttribute('href')).toBe('/dog-shop');
    showcase.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
    );
    await fixture.whenStable();
    expect(element.querySelector('.project-info a')?.getAttribute('href')).toBe('/dog-shop');
  });
});
