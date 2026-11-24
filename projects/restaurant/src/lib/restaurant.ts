import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink, CurrencyPipe, NgOptimizedImage],
  selector: 'lib-restaurant',
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.css',
})
export class Restaurant {
  protected readonly categories = [
    'All dishes',
    'To start',
    'The main event',
    'Something sweet',
  ] as const;
  protected readonly category = signal<string>('All dishes');
  protected readonly menu = [
    {
      name: 'The garden bowl',
      category: 'To start',
      price: 18,
      image: 'seasonal-salad',
      description: 'Market greens, roasted vegetables, grains, and our bright herb dressing.',
      note: 'PLANT-BASED',
    },
    {
      name: 'Sunday kind of pasta',
      category: 'The main event',
      price: 26,
      image: 'fresh-pasta',
      description: 'Fresh pasta, slow-roasted tomatoes, basil, and a generous finish of parmesan.',
      note: 'A HOUSE FAVORITE',
    },
    {
      name: 'A very berry ending',
      category: 'Something sweet',
      price: 12,
      image: 'berry-dessert',
      description: 'A little cake, a little cream, and the best berries of the season.',
      note: 'SAVE A LITTLE ROOM',
    },
  ];
  protected readonly visibleMenu = computed(() =>
    this.menu.filter(
      (dish) => this.category() === 'All dishes' || dish.category === this.category(),
    ),
  );
  protected readonly partySize = signal(2);
  protected readonly times = ['6:00 PM', '6:30 PM', '7:30 PM'];
  protected readonly time = signal('6:00 PM');
  protected readonly bookingConfirmed = signal(false);

  protected openBooking(dialog: HTMLDialogElement): void {
    this.bookingConfirmed.set(false);
    dialog.showModal();
  }
}
