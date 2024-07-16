import { Injectable } from '@angular/core';
import { TestManagerApiService } from './test-manager-api.service';
import { SelectedTestSingletonService } from '../../singletons/selected-test-singleton.service';

@Injectable({
  providedIn: 'root',
})
export class TestManagerService {
  constructor(
    private readonly apiService: TestManagerApiService,
    private readonly singleton: SelectedTestSingletonService
  ) {}

  private testNames: string[] = [];

  //API

  loadUsersTests(): void {
    this.apiService.getUsersTests().subscribe((response) => {
      this.testNames = response;
    });
  }

  createNewTestAndLoadTests(testName: string): void {
    this.apiService
      .createNewTestAndGetUsersTests(testName)
      .subscribe((response) => {
        this.testNames = response;
      });
  }

  removeTestAndLoadTests(index: number): void {
    var testName = this.getUsersTestNames()[index];

    this.apiService
      .removeTestAndGetUsersTests(testName)
      .subscribe((response) => {
        this.testNames = response;
      });
  }

  updateTestNameAndLoadTests(oldName: string, newName: string): void {
    this.apiService
      .updateTestNameAndGetUsersTests(oldName, newName)
      .subscribe((response) => {
        this.testNames = response;
      });
  }

  //NON API

  getUsersTestNames(): string[] {
    return this.testNames;
  }

  getSelectedTestName(): string | null {
    return this.singleton.getSelectedTestName();
  }

  selectTestName(testName: string | null): void {
    this.singleton.setSelectedTestName(testName);
  }
}
