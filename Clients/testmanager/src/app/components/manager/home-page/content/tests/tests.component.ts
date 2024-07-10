import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
})
export class TestsComponent {
  constructor(private readonly router: Router) {}

  displayTestManager(): void {
    this.router.navigateByUrl('home/tests/manager');
  }
}
