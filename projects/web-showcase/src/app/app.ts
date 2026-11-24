import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private hasActivatedRoute = false;
  protected readonly showShowcaseNavigation = signal(false);

  protected onRouteActivate(outlet: RouterOutlet, mainContent: HTMLElement): void {
    this.showShowcaseNavigation.set(
      outlet.activatedRoute.snapshot.data['showcaseNavigation'] === true,
    );
    if (this.hasActivatedRoute) {
      mainContent.focus({ preventScroll: true });
    }
    this.hasActivatedRoute = true;
  }
}
