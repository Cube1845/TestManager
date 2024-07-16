import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestSettings } from '../../../models/types/testSettings';
import { UpdateTestSettingsDTO } from '../../../models/DTOs/test-edit/updateTestSettingsDto';
import { environment } from '../../../../../environments/environment.development';

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
  ): Observable<void> {
    var data: UpdateTestSettingsDTO = {
      name: testName,
      settings: settings,
    };

    return this.http.put<void>(this.apiUrl, data);
  }
}
