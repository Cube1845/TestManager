import { Component, OnInit } from '@angular/core';
import { TableColorService } from '../../../../../../services/questions/table-color.service';
import { QuestionBaseApiService } from '../../../../../../services/questions/base/question-base-api.service';
import { QuestionBase } from '../../../../../../models/types/questionBase';
import { NgStyle } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuestionBaseService } from '../../../../../../services/questions/base/question-base.service';

@Component({
  selector: 'app-base-manager',
  standalone: true,
  imports: [NgStyle, ReactiveFormsModule],
  templateUrl: './base-manager.component.html',
  styleUrl: './base-manager.component.scss',
})
export class BaseManagerComponent implements OnInit {
  constructor(
    private readonly tableColorService: TableColorService,
    private readonly questionBaseApiService: QuestionBaseApiService,
    private readonly questionBaseService: QuestionBaseService
  ) {}

  ngOnInit(): void {
    this.questionBaseService.setQuestionBases(
      this.questionBaseApiService.getUsersBases()
    );
  }

  baseFormGroup = new FormGroup({
    index: new FormControl(''),
    name: new FormControl(''),
  });

  selectBase(index: number): void {
    this.baseFormGroup.setValue({
      index: (index + 1).toString(),
      name: this.questionBaseApiService.getUsersBases()[index],
    });
    return;
  }

  getUsersBases(): string[] {
    return this.questionBaseService.getQuestionBases()!;
  }

  getValidColor(index: number): string {
    const selectedIndex = Number(this.baseFormGroup.controls.index.value!) - 1;
    return this.tableColorService.getValidColor(index, selectedIndex);
  }

  setHoveredRow(index: number): void {
    this.tableColorService.setHoveredRow(index);
  }

  addNewQuestion(): void {
    var questions = this.questionBaseApiService.getUsersBases();

    this.baseFormGroup.setValue({
      index: (questions!.length + 1).toString(),
      name: 'Baza pytań',
    });
  }

  saveSelectedQuestionBase(): void {
    var questionBaseName = this.baseFormGroup.controls.name.value!;
    var index = Number(this.baseFormGroup.controls.index.value!) - 1;

    //move to api service
    var questionBases = this.questionBaseService.getQuestionBases();

    if (questionBases!.length < index + 1) {
      this.questionBaseService.addQuestionBase(questionBaseName);
    } else {
      questionBases![index] = questionBaseName;
      this.questionBaseService.setQuestionBases(questionBases!);
    }
  }

  removeSelectedQuestionBase() {
    var index = Number(this.baseFormGroup.controls.index.value!) - 1;
    this.questionBaseService.removeQuestionBase(index);
    this.baseFormGroup.reset();
  }
}
