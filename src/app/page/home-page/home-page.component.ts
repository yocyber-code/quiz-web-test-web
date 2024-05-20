import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private readonly router: Router) {}

  async register() {
    this.router.navigate(['/register']);
  }

  async login() {
    this.router.navigate(['/login']);
  }
}
