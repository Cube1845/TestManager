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

  displayQuestionBase(baseName: string): void {
    this.questions = this.questionApiService.getQuestionBase(baseName);
  }

  selectQuestion(index: number) {
    this.questionFormGroup.setValue({
      index: (index + 1).toString(),
      content: this.questions![index].content,
      answerA: this.questions![index].answers[0],
      answerB: this.questions![index].answers[1],
      answerC: this.questions![index].answers[2],
      answerD: this.questions![index].answers[3],
      correctAnswer: this.questions![index].correctAnswer
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
    this.questionFormGroup.setValue({
      index: (this.questions!.length + 1).toString(),
      content: 'Pytanie ' + (this.questions!.length + 1).toString(),
      answerA: '',
      answerB: '',
      answerC: '',
      answerD: '',
      correctAnswer: 'a'
    });
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
