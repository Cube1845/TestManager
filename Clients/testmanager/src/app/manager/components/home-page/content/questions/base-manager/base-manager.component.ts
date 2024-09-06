import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment.development';
import { TableColorService } from '../../../../../services/cosmetics/table-color.service';
import { QuestionBaseService } from '../../../../../services/questions/base/question-base.service';

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
    private readonly questionBaseService: QuestionBaseService,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.questionBaseService.loadQuestionBasesNames();
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
    var usersQuestionBases = this.questionBaseService.getQuestionBasesNames();
    var selectedIndex = Number(this.baseFormGroup.controls.index.value!);

    if (usersQuestionBases.length < selectedIndex) {
      return;
    }

    this.questionBaseService.selectQuestionBase(
      usersQuestionBases[selectedIndex - 1]
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
      name: 'Baza pytań ' + (questions!.length + 1).toString(),
    });
  }

  saveSelectedQuestionBase(): void {
    var questionBaseName = this.baseFormGroup.controls.name.value!;
    var index = Number(this.baseFormGroup.controls.index.value!);

    var questionBasesNames = this.questionBaseService.getQuestionBasesNames();

    if (questionBasesNames!.length < index) {
      this.questionBaseService.createNewQuestionBaseAndLoadBasesNames(
        questionBaseName
      );
    } else {
      this.questionBaseService.updateQuestionBaseNameAndLoadBasesNames(
        questionBasesNames![index - 1],
        questionBaseName
      );
    }
  }

  removeSelectedQuestionBase() {
    var index = Number(this.baseFormGroup.controls.index.value!) - 1;
    this.questionBaseService
      .removeQuestionBaseAndLoadBasesNames(index)
      .subscribe(() => this.baseFormGroup.reset());
  }

  isAnyQuestionBaseSelected(): boolean {
    return this.baseFormGroup.controls.index.value != '';
  }
}
