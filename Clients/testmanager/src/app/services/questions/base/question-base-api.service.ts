import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { UpdateQuestionBaseNameDTO } from '../../../models/DTOs/updateQuestionBaseNameDto';
import { QuestionBaseNameDTO } from '../../../models/DTOs/questionBaseNameDto';

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
    baseName: string
  ): Observable<string[]> {
    var data: QuestionBaseNameDTO = {
      questionBaseName: baseName,
    };

    return this.http.post<string[]>(
      this.apiUrl + '/CreateNewQuestionBaseAndGetUsersQuestionBasesNames',
      data
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

  removeQuestionBaseAndGetAllUsersBases(
    baseName: string
  ): Observable<string[]> {
    var data: QuestionBaseNameDTO = {
      questionBaseName: baseName,
    };

    return this.http.post<string[]>(
      this.apiUrl + '/RemoveQuestionBaseAndGetUsersQuestionBasesNames',
      data
    );
  }
}
