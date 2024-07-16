import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TestManagerService } from '../../../../services/tests/manager/test-manager.service';

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
    private readonly testManagerService: TestManagerService
  ) {}

  displayTestManager(): void {
    this.router.navigateByUrl('home/tests/manager');
    this.testManagerService.selectTestName(null);
  }

  getSelectedTestName(): string {
    var testName = this.testManagerService.getSelectedTestName();

    if (testName == null) {
      testName = 'Wybierz';
    }

    return testName;
  }
}
