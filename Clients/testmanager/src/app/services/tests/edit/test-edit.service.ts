import { Injectable, OnInit } from '@angular/core';
import { TestEditApiService } from './test-edit-api.service';
import { TestSettings } from '../../../models/types/testSettings';
import { TestManagerService } from '../manager/test-manager.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestEditService {
  constructor(
    private readonly testEditApiService: TestEditApiService,
    private readonly testManagerService: TestManagerService
  ) {}

  private settingsLoadedSubject = new Subject<TestSettings>();
  $settingsLoaded = this.settingsLoadedSubject.asObservable();

  //API

  loadTestSettings(testName: string): void {
    this.testEditApiService.getTestSettings(testName).subscribe((response) => {
      this.settingsLoadedSubject.next(response);
    });
  }

  saveTestSettings(
    testName: string,
    testSettings: TestSettings
  ): Observable<TestSettings> {
    return this.testEditApiService.updateTestSettingsAndGetSettings(
      testName,
      testSettings
    );
  }

  //NON API
}
