import { Injectable } from '@angular/core';
import { Question } from '../../../../global/types/question';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EditQuestionsInQuestionBaseDTO } from '../../../models/DTOs/question-edit/editQuestionsInQuestionBaseDto';
import { UpdateQuestionInQuestionBaseDTO } from '../../../models/DTOs/question-edit/updateQuestionInQuestionBaseDto';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class QuestionApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl + '/api/questions/edit';

  getQuestionsFromQuestionBase(baseName: string): Observable<Question[]> {
    return this.http.get<Question[]>(
      this.apiUrl + `?questionBaseName=${baseName}`
    );
  }

  addQuestionToQuestionBaseAndGetQuestions(
    baseName: string,
    questionToAdd: Question
  ): Observable<Question[]> {
    var data: EditQuestionsInQuestionBaseDTO = {
      questionBaseName: baseName,
      question: questionToAdd,
    };

    return this.http.post<Question[]>(this.apiUrl, data);
  }

  removeQuestionFromQuestionBaseAndGetQuestions(
    baseName: string,
    questionToRemoveIndex: number
  ): Observable<Question[]> {
    return this.http.delete<Question[]>(
      this.apiUrl +
        `?questionBaseName=${baseName}&questionToRemoveIndex=${questionToRemoveIndex}`
    );
  }

  updateQuestionInQuestionBaseAndGetQuestions(
    baseName: string,
    questionIndex: number,
    updatedQuestion: Question
  ): Observable<Question[]> {
    var data: UpdateQuestionInQuestionBaseDTO = {
      questionBaseName: baseName,
      questionIndex: questionIndex,
      updatedQuestion: updatedQuestion,
    };

    return this.http.put<Question[]>(this.apiUrl, data);
  }
}
