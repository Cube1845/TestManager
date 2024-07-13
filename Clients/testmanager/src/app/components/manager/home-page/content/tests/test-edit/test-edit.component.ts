import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestManagerService } from '../../../../../../services/tests/manager/test-manager.service';
import { ComboBoxComponent } from './combo-box/combo-box.component';
import { QuestionBaseApiService } from '../../../../../../services/questions/base/question-base-api.service';
import { TestEditService } from '../../../../../../services/tests/edit/test-edit.service';
import { TestSettings } from '../../../../../../models/types/testSettings';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-test-edit',
  standalone: true,
  imports: [ComboBoxComponent, ReactiveFormsModule],
  templateUrl: './test-edit.component.html',
  styleUrl: './test-edit.component.scss',
})
export class TestEditComponent implements OnInit, OnDestroy {
  constructor(
    private readonly testManagerService: TestManagerService,
    private readonly questionBaseApiService: QuestionBaseApiService,
    private readonly testEditService: TestEditService
  ) {}

  usersQuestionBases: string[] = [];

  settingsFormGroup: FormGroup = new FormGroup({
    questionCount: new FormControl([
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
  });

  ngOnInit(): void {
    this.questionBaseApiService.getUsersQuestionBases().subscribe((names) => {
      this.usersQuestionBases = names;
    });
    this.settingsFormGroup.setValue({
      questionCount: this.testEditService.getTestSettings(),
    });
  }

  ngOnDestroy(): void {
    this.testManagerService.selectTestName(null);
  }

  getTestSettings(): TestSettings {
    return this.testEditService.getTestSettings();
  }
}
