import { Component } from '@angular/core';
import { TestManagerService } from '../../../../../services/tests/manager/test-manager.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  constructor(private readonly testManagerService: TestManagerService) {}

  getUsersTests(): string[] {
    return this.testManagerService.getUsersTestNames();
  }
}
