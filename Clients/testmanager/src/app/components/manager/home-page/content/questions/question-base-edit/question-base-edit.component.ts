import { Component } from '@angular/core';
import { QuestionService } from '../../../../../../services/questions/question.service';
import { QuestionApiService } from '../../../../../../services/questions/question-api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from '../../../../../../models/types/question';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-question-base-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './question-base-edit.component.html',
  styleUrl: './question-base-edit.component.scss'
})
export class QuestionBaseEditComponent {
  constructor(private readonly questionService: QuestionService, private readonly questionApiService: QuestionApiService) {}

  hoveredRow: number = -1;

  questionFormGroup = new FormGroup({
    index: new FormControl(''),
    content: new FormControl('', Validators.required),
    answerA: new FormControl('', Validators.required),
    answerB: new FormControl(''),
    answerC: new FormControl(''),
    answerD: new FormControl(''),
    correctAnswer: new FormControl('', Validators.required),
  });

  displayQuestionBase(baseName: string): void {
    var questions = this.questionApiService.getQuestionBase(baseName); 
    this.questionService.setQuestions(questions);
  }

  getQuestions(): Question[] {
    return this.questionService.getQuestions()!;
  }

  isTableRowSelected(index: number) {
    return Number(this.questionFormGroup.controls.index.value!) - 1 == index;
  }

  getTableRowSelectedColor(index: number) {
    return '#445B73';
  }

  getTableRowHoveredColor(index: number) {
    return '#344B63';
  }

  getTableRowColor(index: number) {
    return '#243B53';
  }

  getValidColor(index: number) {
    if (this.isTableRowSelected(index)) {
      return this.getTableRowSelectedColor(index);
    } else {
      if (this.hoveredRow === index) {
        return this.getTableRowHoveredColor(index);
      } else {
        return this.getTableRowColor(index);
      }
    }
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
    var index = Number(this.questionFormGroup.controls.index.value!) - 1;

    this.questionApiService.saveQuestion(question, index);

    //move to api service
    var questions = this.questionService.getQuestions();

    if (questions!.length < index + 1) {
      this.questionService.addQuestion(question);
    } else {
      questions![index] = question;
      this.questionService.setQuestions(questions!);
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

  isAnyQuestionSelected(): boolean {
    return this.questionFormGroup.controls.index.value != '';
  }

  removeSelectedQuestion() {
    var index = Number(this.questionFormGroup.controls.index.value!) - 1;
    this.questionService.removeQuestion(index);
    this.questionFormGroup.reset();
  }
}
