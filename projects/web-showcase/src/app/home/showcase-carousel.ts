import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConceptPreview } from './concept-preview';

@Component({
  selector: 'app-showcase-carousel',
  imports: [RouterLink, ConceptPreview],
  templateUrl: './showcase-carousel.html',
  styleUrl: './showcase-carousel.scss',
})
export class ShowcaseCarousel {
  protected readonly projects = [
    {
      name: 'The neighborhood table',
      category: 'FOOD & HOSPITALITY',
      type: 'Restaurant',
      route: '/restaurant',
      preview: 'restaurant',
      description:
        'A little taste of what your next chapter could look like. A welcoming digital home for places that bring people together.',
      tags: ['Brand experience', 'Restaurant website', 'Mobile-first'],
    },
    {
      name: 'Good things. Great dogs.',
      category: 'PETS & RETAIL',
      type: 'Dog shop',
      route: '/dog-shop',
      preview: 'dog-shop',
      description:
        'Big personality for a business with a lot of heart. A playful digital direction for the shops our best friends deserve.',
      tags: ['Brand experience', 'Retail website', 'Mobile-first'],
    },
    {
      name: 'A new way forward.',
      category: 'AUTOMOTIVE & MOBILITY',
      type: 'Dealership',
      route: '/dealership',
      preview: 'dealership',
      description:
        'A confident first impression for the road ahead. A refined digital direction for dealerships that put people in the driving seat.',
      tags: ['Brand experience', 'Dealership website', 'Mobile-first'],
    },
  ] as const;
  protected readonly activeIndex = signal(0);
  protected readonly activeProject = computed(() => this.projects[this.activeIndex()]);

  protected move(direction: number): void {
    this.activeIndex.update(
      (index) => (index + direction + this.projects.length) % this.projects.length,
    );
  }

  protected onCarouselKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.move(event.key === 'ArrowRight' ? 1 : -1);
    }
  }
}
