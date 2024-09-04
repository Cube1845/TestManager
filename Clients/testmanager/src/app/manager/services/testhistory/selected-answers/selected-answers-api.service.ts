import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ContentSelectedAnswers } from '../../../models/types/contentSelectedAnswers';

@Injectable({
  providedIn: 'root',
})
export class SelectedAnswersApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl;

  getSelectedAnswers(
    testHistoryId: number
  ): Observable<ContentSelectedAnswers> {
    return this.http.get<ContentSelectedAnswers>(
      this.apiUrl +
        '/api/testhistory/history' +
        '?testHistoryId=' +
        testHistoryId
    );
  }
}
