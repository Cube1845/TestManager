import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionService } from '../../../../../../services/questions/questions/question.service';
import { QuestionApiService } from '../../../../../../services/questions/questions/question-api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Question } from '../../../../../../models/types/question';
import { NgStyle } from '@angular/common';
import { TableColorService } from '../../../../../../services/cosmetics/table-color.service';
import { QuestionBaseService } from '../../../../../../services/questions/base/question-base.service';

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

  selectQuestion(index: number) {
    var questions = this.questionService.getQuestions();

    this.questionFormGroup.setValue({
      index: (index + 1).toString(),
      content: questions![index].content,
      answerA: questions![index].answers[0],
      answerB: questions![index].answers[1],
      answerC: questions![index].answers[2],
      answerD: questions![index].answers[3],
      correctAnswer: questions![index].correctAnswer,
    });
  }

  saveSelectedQuestion(): void {
    var question: Question = {
      content: this.questionFormGroup.controls.content.value!,
      answers: [
        this.questionFormGroup.controls.answerA.value!,
        this.questionFormGroup.controls.answerB.value!,
        this.questionFormGroup.controls.answerC.value!,
        this.questionFormGroup.controls.answerD.value!,
      ],
      correctAnswer: this.questionFormGroup.controls.correctAnswer.value!,
    };

    var index = Number(this.questionFormGroup.controls.index.value!);

    //move to api service
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
