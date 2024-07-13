import { Injectable, OnInit } from '@angular/core';
import { TestEditApiService } from './test-edit-api.service';
import { TestSettings } from '../../../models/types/testSettings';
import { TestManagerService } from '../manager/test-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TestEditService implements OnInit {
  constructor(
    private readonly testEditApiService: TestEditApiService,
    private readonly testManagerService: TestManagerService
  ) {}

  ngOnInit(): void {
    this.loadTestSettings(this.testManagerService.getSelectedTestName()!);
  }

  private testSettings!: TestSettings;

  //API

  loadTestSettings(testName: string): void {
    this.testEditApiService.getTestSettings(testName).subscribe((response) => {
      this.testSettings = response;
    });
  }

  //NON API

  getTestSettings(): TestSettings {
    return this.testSettings;
  }
}
