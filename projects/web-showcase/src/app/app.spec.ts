import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('Showcase navigation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('renders the app shell and a working skip target', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('.skip-link')?.getAttribute('href')).toBe('#main-content');
    expect(element.querySelector('main')?.id).toBe('main-content');
    expect(element.querySelector('.site-header')).not.toBeNull();
    expect(element.querySelector('.site-footer')).not.toBeNull();
  });

  it('preserves initial browser focus and focuses main after in-app route changes', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const main = element.querySelector('main')!;
    const focus = vi.spyOn(main, 'focus');
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/restaurant');
    await fixture.whenStable();
    expect(focus).not.toHaveBeenCalled();

    await router.navigateByUrl('/');
    await fixture.whenStable();
    expect(focus).toHaveBeenCalledWith({ preventScroll: true });
    expect(document.activeElement).toBe(main);
  });

  it.each([
    ['/restaurant', 'your table.'],
    ['/dog-shop', 'Great dogs.'],
    ['/dealership', 'great drive.'],
  ])('renders %s without showcase navigation', async (path, title) => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl(path);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h1')?.textContent).toContain(title);
    expect(element.querySelector('.site-header')).toBeNull();
    expect(element.querySelector('.site-footer')).toBeNull();
    expect(element.querySelector('a[href="/#showcase"]')).toBeNull();
    expect(element.querySelector('.demo-ribbon a')).toBeNull();
    element.querySelector<HTMLAnchorElement>('.skip-link')?.click();
    await fixture.whenStable();
    expect(router.url).toBe(path);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    expect(element.querySelector('.site-header')).not.toBeNull();
    expect(element.querySelector('.site-footer')).not.toBeNull();
  });

  it('returns unknown paths to the showcase', async () => {
    const harness = await RouterTestingHarness.create('/not-a-demo');
    expect(TestBed.inject(Router).url).toBe('/');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Small business.',
    );
  });
});
