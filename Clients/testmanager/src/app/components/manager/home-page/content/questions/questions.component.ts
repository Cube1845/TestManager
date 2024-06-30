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
    private readonly router: Router
  ) {}

  getQuestions(): Question[] {
    return this.questionService.getQuestions()!;
  }

  displayQuestionBaseManager() {
    this.router.navigateByUrl('home/questions/base-manager');
  }
}
