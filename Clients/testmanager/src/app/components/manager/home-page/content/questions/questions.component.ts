import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../../../models/types/question';
import { QuestionApiService } from '../../../../../services/questions/question-api.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  constructor(private readonly questionApiService: QuestionApiService) {}

  questions: Question[] | null = null;

  chooseQuestionBase(): void {
    this.questions = this.questionApiService.getQuestionBase('dupa');
  }
}
