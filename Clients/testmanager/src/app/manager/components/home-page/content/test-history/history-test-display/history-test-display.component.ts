import { Component } from '@angular/core';
import { TestManagerService } from '../../../../../services/tests/manager/test-manager.service';
import { Router } from '@angular/router';
import { SelectedTestNameSessionService } from '../../../../../services/singletons/selected-test-name-session.service';

@Component({
  selector: 'app-history-test-display',
  standalone: true,
  imports: [],
  templateUrl: './history-test-display.component.html',
  styleUrl: './history-test-display.component.scss',
})
export class HistoryTestDisplayComponent {
  constructor(
    private readonly testManagerService: TestManagerService,
    private readonly router: Router,
    private readonly selectedTestNameService: SelectedTestNameSessionService
  ) {}

  getUsersTests(): string[] {
    return this.testManagerService.getUsersTestNames();
  }

  goToTestHistory(testName: string): void {
    this.router.navigateByUrl('home/test-history/history/' + testName);
    this.selectedTestNameService.setSelectedTestName(testName);
  }
}
