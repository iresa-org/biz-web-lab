import { CurrencyPipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Vehicle {
  id: number;
  name: string;
  type: string;
  price: number;
  year: number;
  miles: number;
  fuel: string;
  image: string;
  description: string;
}

@Component({
  imports: [RouterLink, CurrencyPipe, DecimalPipe, NgOptimizedImage],
  selector: 'lib-dealership',
  templateUrl: './dealership.html',
  styleUrl: './dealership.css',
})
export class Dealership {
  protected readonly types = ['All vehicles', 'Sedan', 'SUV', 'Coupe'] as const;
  protected readonly type = signal<string>('All vehicles');
  protected readonly affordableOnly = signal(false);
  protected readonly vehicles: readonly Vehicle[] = [
    {
      id: 1,
      name: 'Meridian Touring',
      type: 'Sedan',
      price: 32900,
      year: 2024,
      miles: 18400,
      fuel: 'Hybrid',
      image: 'car-road',
      description: 'An effortless daily drive with a refined cabin and room for your next chapter.',
    },
    {
      id: 2,
      name: 'Atlas Ridge',
      type: 'SUV',
      price: 38900,
      year: 2024,
      miles: 12600,
      fuel: 'Gasoline',
      image: 'adventure-car',
      description: 'Space for the family, the weekend bags, and the road less traveled.',
    },
    {
      id: 3,
      name: 'Solstice Sport',
      type: 'Coupe',
      price: 54900,
      year: 2025,
      miles: 6200,
      fuel: 'Gasoline',
      image: 'city-car',
      description:
        'A spirited companion for open roads, long weekends, and taking the scenic route.',
    },
  ];
  protected readonly visibleVehicles = computed(() =>
    this.vehicles.filter(
      (vehicle) =>
        (this.type() === 'All vehicles' || vehicle.type === this.type()) &&
        (!this.affordableOnly() || vehicle.price < 40000),
    ),
  );
  protected readonly selectedVehicle = signal<Vehicle | null>(null);
  protected readonly testDriveRequested = signal(false);

  protected resetFilters(): void {
    this.type.set('All vehicles');
    this.affordableOnly.set(false);
  }

  protected toggleBudget(): void {
    this.affordableOnly.update((value) => !value);
  }

  protected openVehicle(vehicle: Vehicle, dialog: HTMLDialogElement): void {
    this.selectedVehicle.set(vehicle);
    this.testDriveRequested.set(false);
    dialog.showModal();
  }
}
