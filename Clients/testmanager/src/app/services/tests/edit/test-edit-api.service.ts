import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestSettings } from '../../../models/types/testSettings';
import { environment } from '../../../../environments/environment.development';
import { UpdateTestSettingsDTO } from '../../../models/DTOs/test-edit/updateTestSettingsDTO';

@Injectable({
  providedIn: 'root',
})
export class TestEditApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl + '/api/tests/settings';

  getTestSettings(testName: string): Observable<TestSettings> {
    return this.http.get<TestSettings>(this.apiUrl + `?testName=${testName}`);
  }

  updateTestSettingsAndGetSettings(
    testName: string,
    settings: TestSettings
  ): Observable<TestSettings> {
    var data: UpdateTestSettingsDTO = {
      name: testName,
      settings: settings,
    };

    return this.http.put<TestSettings>(this.apiUrl, data);
  }
}
