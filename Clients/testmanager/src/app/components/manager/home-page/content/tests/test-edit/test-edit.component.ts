import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';

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
  ) {
    this.testEditService.$settingsLoaded
      .pipe(takeUntilDestroyed())
      .subscribe((settings) => {
        this.settingsFormGroup.setValue(settings);
      });
  }

  usersQuestionBases: string[] = [];

  settingsFormGroup = new FormGroup({
    questionCount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
    usedQuestionBases: new FormControl<string[]>([]),
  });

  ngOnInit(): void {
    this.testEditService.loadTestSettings(
      this.testManagerService.getSelectedTestName()!
    );
    this.questionBaseApiService.getUsersQuestionBases().subscribe((names) => {
      this.usersQuestionBases = names;
    });
  }

  ngOnDestroy(): void {
    this.testManagerService.selectTestName(null);
  }

  saveSettings(): void {
    const settings: TestSettings = {
      questionCount: this.settingsFormGroup.value.questionCount!,
      usedQuestionBases: this.settingsFormGroup.value.usedQuestionBases!,
    };

    this.testEditService
      .saveTestSettings(
        this.testManagerService.getSelectedTestName()!,
        settings
      )
      .pipe(take(1))
      .subscribe();
  }
}
