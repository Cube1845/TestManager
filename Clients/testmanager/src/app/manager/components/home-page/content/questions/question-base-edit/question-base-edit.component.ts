import { NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Question } from '../../../../../models/types/question';
import { TableColorService } from '../../../../../services/cosmetics/table-color.service';
import { QuestionBaseService } from '../../../../../services/questions/base/question-base.service';
import { QuestionService } from '../../../../../services/questions/questions/question.service';

@Component({
  selector: 'app-question-base-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './question-base-edit.component.html',
  styleUrl: './question-base-edit.component.scss',
})
export class QuestionBaseEditComponent implements OnInit, OnDestroy {
  constructor(
    private readonly questionService: QuestionService,
    private readonly tableColorService: TableColorService,
    private readonly questionBaseService: QuestionBaseService
  ) {}

  ngOnInit(): void {
    var selectedQuestionBaseName =
      this.questionBaseService.getSelectedQuestionBase();
    this.questionService.loadQuestionsFromUsersQuestionBase(
      selectedQuestionBaseName!
    );
  }

  ngOnDestroy(): void {
    this.questionBaseService.selectQuestionBase(null);
  }

  getValidColor(index: number): string {
    const selectedIndex =
      Number(this.questionFormGroup.controls.index.value!) - 1;
    return this.tableColorService.getValidColor(index, selectedIndex);
  }

  setHoveredRow(index: number): void {
    this.tableColorService.setHoveredRow(index);
  }

  questionFormGroup = new FormGroup({
    index: new FormControl(''),
    content: new FormControl('', Validators.required),
    answerA: new FormControl('', Validators.required),
    answerB: new FormControl(''),
    answerC: new FormControl(''),
    answerD: new FormControl(''),
    correctAnswer: new FormControl('', Validators.required),
  });

  getQuestions(): Question[] {
    return this.questionService.getQuestions();
  }

  convertDigitToAnswerLetter(digit: number): string {
    switch (digit) {
      case 0:
        return 'a';
      case 1:
        return 'b';
      case 2:
        return 'c';
      case 3:
        return 'd';
      default:
        return 'a';
    }
  }

  convertAnswerLetterToDigit(answerLetter: string): number {
    switch (answerLetter) {
      case 'a':
        return 0;
      case 'b':
        return 1;
      case 'c':
        return 2;
      case 'd':
        return 3;
      default:
        return 0;
    }
  }

  selectQuestion(index: number) {
    var questions = this.questionService.getQuestions();

    var answerIndex = 0;

    questions![index].answers.forEach((answer, ansIndex) => {
      if (answer.isCorrect) {
        answerIndex = ansIndex;
      }
    });

    this.questionFormGroup.setValue({
      index: (index + 1).toString(),
      content: questions![index].content,
      answerA: questions![index].answers[0].text,
      answerB: questions![index].answers[1].text,
      answerC: questions![index].answers[2].text,
      answerD: questions![index].answers[3].text,
      correctAnswer: this.convertDigitToAnswerLetter(answerIndex),
    });
  }

  saveSelectedQuestion(): void {
    var question: Question = {
      content: this.questionFormGroup.controls.content.value!,
      answers: [
        {
          text: this.questionFormGroup.controls.answerA.value!,
          isCorrect: false,
        },
        {
          text: this.questionFormGroup.controls.answerB.value!,
          isCorrect: false,
        },
        {
          text: this.questionFormGroup.controls.answerC.value!,
          isCorrect: false,
        },
        {
          text: this.questionFormGroup.controls.answerD.value!,
          isCorrect: false,
        },
      ],
    };

    var correctAnswerIndex = this.convertAnswerLetterToDigit(
      this.questionFormGroup.controls.correctAnswer.value!
    );
    question.answers[correctAnswerIndex].isCorrect = true;

    var index = Number(this.questionFormGroup.controls.index.value!);

    var questions = this.questionService.getQuestions();
    var selectedQuestionBaseName =
      this.questionBaseService.getSelectedQuestionBase();

    if (questions.length < index) {
      this.questionService.addQuestionToQuestionBaseAndLoadQuestions(
        selectedQuestionBaseName!,
        question
      );
    } else {
      this.questionService.updateQuestionInQuestionBaseAndLoadQuestions(
        selectedQuestionBaseName!,
        index - 1,
        question
      );
    }
  }

  addNewQuestion(): void {
    var questions = this.questionService.getQuestions();

    this.questionFormGroup.setValue({
      index: (questions!.length + 1).toString(),
      content: 'Pytanie ' + (questions!.length + 1).toString(),
      answerA: '',
      answerB: '',
      answerC: '',
      answerD: '',
      correctAnswer: 'a',
    });
  }

  removeSelectedQuestion(): void {
    var index = Number(this.questionFormGroup.controls.index.value!);
    var selectedQuestionBaseName =
      this.questionBaseService.getSelectedQuestionBase()!;

    this.questionService.removeQuestionFromQuestionBaseAndLoadQuestions(
      selectedQuestionBaseName,
      index - 1
    );
    this.questionFormGroup.reset();
  }

  isAnyQuestionSelected(): boolean {
    return this.questionFormGroup.controls.index.value != '';
  }
}
