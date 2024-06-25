import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../../../models/types/question';
import { QuestionApiService } from '../../../../../services/questions/question-api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ ReactiveFormsModule, NgStyle ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  constructor(private readonly questionApiService: QuestionApiService) {}

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

  questions: Question[] | null = null;

  isTableRowSelected(index: number) {
    return Number(this.questionFormGroup.controls.index.value!) - 1 == index;
  }

  getTableRowSelectedColor(index: number) {
    return 'rgb(92, 97, 99)';
  }

  getTableRowHoveredColor(index: number) {
    return 'rgb(79, 85, 87)';
  }

  getTableRowColor(index: number) {
    return 'rgb(68, 76, 78)';
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

  displayQuestionBase(baseName: string): void {
    this.questions = this.questionApiService.getQuestionBase(baseName);
  }

  selectQuestion(index: number) {
    this.questionFormGroup.controls.index.setValue((index + 1).toString());
    this.questionFormGroup.controls.content.setValue(this.questions![index].content);
    this.questionFormGroup.controls.answerA.setValue(this.questions![index].answers[0]);
    this.questionFormGroup.controls.answerB.setValue(this.questions![index].answers[1]);
    this.questionFormGroup.controls.answerC.setValue(this.questions![index].answers[2]);
    this.questionFormGroup.controls.answerD.setValue(this.questions![index].answers[3]);
    this.questionFormGroup.controls.correctAnswer.setValue(this.questions![index].correctAnswer);
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
      correctAnswer: this.questionFormGroup.controls.correctAnswer.value!
    };
    var index = Number(this.questionFormGroup.controls.index.value!) - 1;

    this.questionApiService.saveQuestion(question, index);

    //move to api service
    if (this.questions!.length < index + 1) {
      this.questions!.push(question);
    } else {
      this.questions![index] = question;
    }
  }

  addNewQuestion(): void {
    this.questionFormGroup.controls.index.setValue((this.questions!.length + 1).toString());
    this.questionFormGroup.controls.content.setValue('Pytanie ' + (this.questions!.length + 1).toString());
    this.questionFormGroup.controls.answerA.setValue('');
    this.questionFormGroup.controls.answerB.setValue('');
    this.questionFormGroup.controls.answerC.setValue('');
    this.questionFormGroup.controls.answerD.setValue('');
    this.questionFormGroup.controls.correctAnswer.setValue('a');

    this.questionFormGroup.setValue({""});
  }

  isAnyQuestionSelected(): boolean {
    return this.questionFormGroup.controls.index.value != '';
  }

  removeSelectedQuestion() {
    var index = Number(this.questionFormGroup.controls.index.value!) - 1;

    this.questions!.splice(index, 1);
    console.log(this.questions);
    this.questionFormGroup.reset();
  }
}
