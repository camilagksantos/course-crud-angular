import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {

  protected readonly title = signal('CRUD Angular + Spring');

  // Controla se mostra a home ou o router-outlet
  protected showHome = signal(true);

  constructor(private router: Router) {
    // Se estiver em qualquer rota que não seja '/', esconde a home
    this.router.events.subscribe(() => {
      this.showHome.set(this.router.url === '/');
    });
  }

  protected navigateToCourses(): void {
    this.showHome.set(false);
    this.router.navigate(['/courses']);
  }

  protected navigateToNewCourse(): void {
    this.showHome.set(false);
    this.router.navigate(['/courses/new']);
  }

  protected goHome(): void {
    this.showHome.set(true);
    this.router.navigate(['/']);
  }

  navigateToSearch(): void {
    this.showHome.set(false);
    this.router.navigate(['/courses/search']);
  }
}
