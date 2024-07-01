import { Component, OnInit } from '@angular/core';
import { TableColorService } from '../../../../../../services/cosmetics/table-color.service';
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
import { Router } from '@angular/router';

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
    private readonly questionBaseService: QuestionBaseService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.questionBaseService.setQuestionBasesNames(
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
      name: this.questionBaseService.getQuestionBasesNames()![index],
    });
    return;
  }

  goToQuestionBaseEditor(): void {
    this.questionBaseService.selectQuestionBase(
      this.baseFormGroup.controls.name.value!
    );
    this.router.navigateByUrl('home/questions/base-edit');
  }

  getUsersBases(): string[] {
    return this.questionBaseService.getQuestionBasesNames()!;
  }

  getValidColor(index: number): string {
    const selectedIndex = Number(this.baseFormGroup.controls.index.value!) - 1;
    return this.tableColorService.getValidColor(index, selectedIndex);
  }

  setHoveredRow(index: number): void {
    this.tableColorService.setHoveredRow(index);
  }

  addNewQuestion(): void {
    var questions = this.questionBaseService.getQuestionBasesNames();

    this.baseFormGroup.setValue({
      index: (questions!.length + 1).toString(),
      name: 'Baza pytań',
    });
  }

  saveSelectedQuestionBase(): void {
    var questionBaseName = this.baseFormGroup.controls.name.value!;
    var index = Number(this.baseFormGroup.controls.index.value!) - 1;

    //move to api service
    var questionBases = this.questionBaseService.getQuestionBasesNames();

    if (questionBases!.length < index + 1) {
      this.questionBaseService.addQuestionBaseName(questionBaseName);
    } else {
      questionBases![index] = questionBaseName;
      this.questionBaseService.setQuestionBasesNames(questionBases!);
    }
  }

  removeSelectedQuestionBase() {
    var index = Number(this.baseFormGroup.controls.index.value!) - 1;
    this.questionBaseService.removeQuestionBaseName(index);
    this.baseFormGroup.reset();
  }

  isAnyQuestionBaseSelected(): boolean {
    return this.baseFormGroup.controls.index.value != '';
  }
}
