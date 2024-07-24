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
  settingsLoaded$ = this.settingsLoadedSubject.asObservable();

  private codeLoadedSubject = new Subject<string>();
  codeLoaded$ = this.codeLoadedSubject.asObservable();

  //API

  loadTestSettings(testName: string): void {
    this.testEditApiService.getTestSettings(testName).subscribe((response) => {
      this.settingsLoadedSubject.next(response);
    });
  }

  saveTestSettings(
    testName: string,
    testSettings: TestSettings
  ): Observable<void> {
    return this.testEditApiService.updateTestSettingsAndGetSettings(
      testName,
      testSettings
    );
  }

  loadTestCode(testName: string): void {
    this.testEditApiService.getTestCode(testName).subscribe((response) => {
      this.codeLoadedSubject.next(response);
    });
  }

  generateTestCodeAndLoadCode(testName: string): void {
    this.testEditApiService
      .generateNewTestCodeAndGetCode(testName)
      .subscribe((response) => {
        this.codeLoadedSubject.next(response);
      });
  }
}
