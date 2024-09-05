import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TestManagerService } from '../../../../services/tests/manager/test-manager.service';
import { SelectedTestNameService } from '../../../../services/testhistory/selected-test-name.service';

@Component({
  selector: 'app-test-history',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './test-history.component.html',
  styleUrl: './test-history.component.scss',
})
export class TestHistoryComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly testManagerService: TestManagerService,
    private readonly selectedTestNameService: SelectedTestNameService
  ) {}

  ngOnInit(): void {
    this.testManagerService.loadUsersTests();
  }

  displayTestHistory(): void {
    this.selectedTestNameService.setSelectedTestName('');
    this.router.navigateByUrl('home/test-history/tests');
  }

  getSelectedTestName(): string {
    const testName = this.selectedTestNameService.getSelectedTestName();

    if (testName == '' || testName == null) {
      return 'Wybierz';
    }

    return testName;
  }
}
