import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SelectedTestSingletonService } from '../../../../../services/singletons/selected-test-singleton.service';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
})
export class TestsComponent {
  constructor(
    private readonly router: Router,
    private readonly singleton: SelectedTestSingletonService
  ) {}

  displayTestManager(): void {
    this.router.navigateByUrl('home/tests/manager');
  }

  getSelectedTestName(): string {
    var testName = this.singleton.getSelectedTestName();

    if (testName == null) {
      testName = 'Wybierz';
    }

    return testName;
  }
}
