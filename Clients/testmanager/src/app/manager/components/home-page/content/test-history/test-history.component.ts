import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TestManagerService } from '../../../../services/tests/manager/test-manager.service';

@Component({
  selector: 'app-test-history',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './test-history.component.html',
  styleUrl: './test-history.component.scss',
})
export class TestHistoryComponent implements OnInit, OnDestroy {
  constructor(
    private readonly router: Router,
    private readonly testManagerService: TestManagerService
  ) {}

  ngOnDestroy(): void {
    this.displayTestHistory();
  }

  ngOnInit(): void {
    this.testManagerService.loadUsersTests();
  }

  displayTestHistory(): void {
    this.router.navigateByUrl('home/test-history/tests');
  }
}
