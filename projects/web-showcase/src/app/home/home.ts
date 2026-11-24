import { Component } from '@angular/core';
import { ShowcaseCarousel } from './showcase-carousel';

@Component({
  selector: 'app-home',
  imports: [ShowcaseCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
