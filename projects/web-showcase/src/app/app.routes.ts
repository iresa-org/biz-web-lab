import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { showcaseNavigation: true },
    title: 'Biz Web Lab | Small business. Big possibilities.',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'restaurant',
    title: 'Restaurant demo | Biz Web Lab',
    loadComponent: () => import('restaurant').then((m) => m.Restaurant),
  },
  {
    path: 'dog-shop',
    title: 'Dog shop demo | Biz Web Lab',
    loadComponent: () => import('dog-shop').then((m) => m.DogShop),
  },
  {
    path: 'dealership',
    title: 'Dealership demo | Biz Web Lab',
    loadComponent: () => import('dealership').then((m) => m.Dealership),
  },
  { path: '**', redirectTo: '' },
];
