import { Injectable } from '@angular/core';
import { Question } from '../../../models/types/question';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuestionBaseNameDTO } from '../../../models/DTOs/questionBaseNameDto';
import { EditQuestionsInQuestionBaseDTO } from '../../../models/DTOs/editQuestionsInQuestionBaseDto';
import { UpdateQuestionInQuestionBaseDTO } from '../../../models/DTOs/updateQuestionInQuestionBaseDto';

@Injectable({
  providedIn: 'root',
})
export class QuestionApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl + '/QuestionEdit';

  getQuestionsFromQuestionBase(baseName: string): Observable<Question[]> {
    var data: QuestionBaseNameDTO = {
      questionBaseName: baseName,
    };

    return this.http.post<Question[]>(
      this.apiUrl + '/GetQuestionsFromQuestionBase',
      data
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

    return this.http.post<Question[]>(
      this.apiUrl + '/AddQuestionToQuestionBaseAndGetQuestions',
      data
    );
  }

  removeQuestionFromQuestionBaseAndGetQuestions(
    baseName: string,
    questionToRemove: Question
  ): Observable<Question[]> {
    var data: EditQuestionsInQuestionBaseDTO = {
      questionBaseName: baseName,
      question: questionToRemove,
    };

    return this.http.post<Question[]>(
      this.apiUrl + '/RemoveQuestionFromQuestionBaseAndGetQuestions',
      data
    );
  }

  updateQuestionInQuestionBaseAndGetQuestions(
    baseName: string,
    oldQuestion: Question,
    updatedQuestion: Question
  ): Observable<Question[]> {
    var data: UpdateQuestionInQuestionBaseDTO = {
      questionBaseName: baseName,
      oldQuestion: oldQuestion,
      updatedQuestion: updatedQuestion,
    };

    return this.http.put<Question[]>(
      this.apiUrl + '/UpdateQuestionInDataBaseAndGetQuestions',
      data
    );
  }
}
