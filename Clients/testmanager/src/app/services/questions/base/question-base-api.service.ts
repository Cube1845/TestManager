import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { UpdateQuestionBaseNameDTO } from '../../../models/DTOs/question-base/updateQuestionBaseNameDto';

@Injectable({
  providedIn: 'root',
})
export class QuestionBaseApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl + '/QuestionBase';

  getUsersQuestionBases(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/GetUsersQuestionBases');
  }

  createQuestionBaseAndGetAllUsersBases(
    questionBaseName: string
  ): Observable<string[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<string[]>(
      this.apiUrl + '/CreateNewQuestionBaseAndGetUsersQuestionBasesNames',
      JSON.stringify(questionBaseName),
      { headers }
    );
  }

  removeQuestionBaseAndGetAllUsersBases(
    baseName: string
  ): Observable<string[]> {
    return this.http.delete<string[]>(
      this.apiUrl +
        '/RemoveQuestionBaseAndGetUsersQuestionBasesNames' +
        `?questionBaseName=${baseName}`
    );
  }

  updateQuestionBaseNameAndGetAllUsersBases(
    oldBaseName: string,
    newBaseName: string
  ): Observable<string[]> {
    var data: UpdateQuestionBaseNameDTO = {
      oldQuestionBaseName: oldBaseName,
      newQuestionBaseName: newBaseName,
    };

    return this.http.put<string[]>(
      this.apiUrl + '/UpdateQuestionBaseNameAndGetUsersQuestionBasesNames',
      data
    );
  }
}
