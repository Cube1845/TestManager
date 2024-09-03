import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TestManagerService } from '../../../../services/tests/manager/test-manager.service';

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
    private readonly testManagerService: TestManagerService
  ) {}

  ngOnInit(): void {
    this.testManagerService.loadUsersTests();
  }

  displayTestHistory(): void {
    this.router.navigateByUrl('home/tests/manager');
  }
}
