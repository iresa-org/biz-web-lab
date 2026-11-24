import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface BagItem {
  product: Product;
  quantity: number;
}

@Component({
  imports: [RouterLink, CurrencyPipe, NgOptimizedImage],
  selector: 'lib-dog-shop',
  templateUrl: './dog-shop.html',
  styleUrl: './dog-shop.css',
})
export class DogShop {
  protected readonly categories = ['All the good stuff', 'Walk', 'Dine', 'Play'] as const;
  protected readonly category = signal<string>('All the good stuff');
  protected readonly products: readonly Product[] = [
    {
      id: 1,
      name: 'The everyday adventure kit',
      category: 'Walk',
      price: 38,
      image: 'trail-dog',
      description: 'A soft harness and matching lead for the long way home.',
    },
    {
      id: 2,
      name: 'The happy dinner bowl',
      category: 'Dine',
      price: 24,
      image: 'dog-bowl',
      description: 'A sturdy ceramic bowl for the most important meal of their day.',
    },
    {
      id: 3,
      name: 'The weekend play bundle',
      category: 'Play',
      price: 29,
      image: 'dogs-playing',
      description: 'A little fetch, a little tug, and a whole lot of tail wags.',
    },
  ];
  protected readonly visibleProducts = computed(() =>
    this.products.filter(
      (product) => this.category() === 'All the good stuff' || product.category === this.category(),
    ),
  );
  protected readonly bag = signal<readonly BagItem[]>([]);
  protected readonly bagCount = computed(() =>
    this.bag().reduce((count, item) => count + item.quantity, 0),
  );
  protected readonly subtotal = computed(() =>
    this.bag().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );
  protected readonly bagNotice = signal('');

  protected add(product: Product): void {
    this.bag.update((items) =>
      items.some((item) => item.product.id === product.id)
        ? items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...items, { product, quantity: 1 }],
    );
    this.bagNotice.set(`${product.name} added to your demo bag (${this.bagCount()} total).`);
  }

  protected remove(product: Product): void {
    this.bag.update((items) => items.filter((item) => item.product.id !== product.id));
    this.bagNotice.set(`${product.name} removed from your demo bag.`);
  }

  protected clearBag(): void {
    this.bag.set([]);
    this.bagNotice.set('Your demo bag is now empty.');
  }
}
