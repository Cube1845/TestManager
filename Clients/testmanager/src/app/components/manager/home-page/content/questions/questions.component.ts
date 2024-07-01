import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../../../models/types/question';
import { QuestionApiService } from '../../../../../services/questions/questions/question-api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgStyle } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { QuestionBaseEditComponent } from './question-base-edit/question-base-edit.component';
import { QuestionService } from '../../../../../services/questions/questions/question.service';
import { QuestionBaseService } from '../../../../../services/questions/base/question-base.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgStyle,
    QuestionBaseEditComponent,
    RouterOutlet,
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent {
  constructor(
    private readonly questionApiService: QuestionApiService,
    private readonly questionService: QuestionService,
    private readonly router: Router,
    private readonly questionBaseService: QuestionBaseService
  ) {}

  getQuestions(): Question[] {
    return this.questionService.getQuestions()!;
  }

  displayQuestionBaseManager() {
    this.questionBaseService.selectQuestionBase(null);
    this.router.navigateByUrl('home/questions/base-manager');
  }

  getSelectedBaseName(): string {
    const baseName = this.questionBaseService.getSelectedQuestionBase();

    if (baseName == null) {
      return 'Wybierz';
    }

    return baseName;
  }
}
