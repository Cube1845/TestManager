import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestHistory } from '../../../models/types/testHistory';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HistoryApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl;

  getTestHistory(testName: string): Observable<TestHistory> {
    return this.http.get<TestHistory>(
      this.apiUrl + '/api/testhistory/history' + '?testName=' + testName
    );
  }
}
