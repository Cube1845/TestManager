import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../../../models/types/question';
import { QuestionApiService } from '../../../../../services/questions/question-api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgStyle } from '@angular/common';
import { AuthApiService } from '../../../../../services/auth/auth-api.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';
import { QuestionBaseEditComponent } from './question-base-edit/question-base-edit.component';
import { QuestionService } from '../../../../../services/questions/question.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle, QuestionBaseEditComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent {
  constructor(
    private readonly questionApiService: QuestionApiService,
    private readonly questionService: QuestionService,
  ) {}

  getQuestions(): Question[] {
    return this.questionService.getQuestions()!;
  }

  displayQuestionBase() {
    this.questionService.setQuestions(
      this.questionApiService.getQuestionBase('d')
    );
  }
}
