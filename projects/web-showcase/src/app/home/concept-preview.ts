import { Component, computed, input } from '@angular/core';

const previews = {
  restaurant: {
    site: 'the neighborhood table',
    brand: 'table.',
    collection: 'The menu',
    eyebrow: 'GOOD FOOD. GREAT COMPANY.',
    heading: 'A seat at',
    emphasis: 'your table.',
    button: 'Find your flavor',
    footer: 'Seasonal ingredients. Timeless moments.',
    caption: 'RESTAURANT',
  },
  'dog-shop': {
    site: 'the good dog club',
    brand: 'good dog.',
    collection: 'The collection',
    eyebrow: 'FOR YOUR VERY BEST FRIEND.',
    heading: 'Good dogs.',
    emphasis: 'Great days.',
    button: 'Meet your favorites',
    footer: 'A little joy, delivered daily.',
    caption: 'DOG SHOP',
  },
  dealership: {
    site: 'forward motor co.',
    brand: 'forward.',
    collection: 'Our vehicles',
    eyebrow: 'A BETTER JOURNEY STARTS HERE.',
    heading: 'Your next',
    emphasis: 'great drive.',
    button: 'Find your next chapter',
    footer: 'Good people. Open roads.',
    caption: 'DEALERSHIP',
  },
};

@Component({
  selector: 'app-concept-preview',
  templateUrl: './concept-preview.html',
  styleUrl: './concept-preview.scss',
})
export class ConceptPreview {
  readonly concept = input.required<keyof typeof previews>();
  protected readonly preview = computed(() => previews[this.concept()]);
}
