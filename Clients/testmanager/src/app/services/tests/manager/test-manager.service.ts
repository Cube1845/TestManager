import { Injectable } from '@angular/core';
import { TestManagerApiService } from './test-manager-api.service';

@Injectable({
  providedIn: 'root',
})
export class TestManagerService {
  constructor(private readonly apiService: TestManagerApiService) {}

  private testNames: string[] = [];

  //API

  loadUsersTests(): void {
    this.testNames = this.apiService.getUsersTests();
  }

  //NON API

  getUsersTestNames(): string[] {
    return this.testNames;
  }
}
