import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProtectedQuestion } from '../../models/types/protectedQuestion';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Result } from '../../../common/models/types/result';
import { TestData } from '../../models/types/testData';

@Injectable({
  providedIn: 'root',
})
export class StartApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl;

  getQuestionSet(testCode: string): Observable<Result<TestData>> {
    return this.http.get<Result<TestData>>(
      this.apiUrl + '/api/user/start' + `?testCode=${testCode}`,
      { headers: { skipAuth: 'true' } }
    );
  }
}
