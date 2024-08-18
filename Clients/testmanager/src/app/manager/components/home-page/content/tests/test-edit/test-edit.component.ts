import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestSettings } from '../../../../../models/types/testSettings';
import { QuestionBaseApiService } from '../../../../../services/questions/base/question-base-api.service';
import { TestEditService } from '../../../../../services/tests/edit/test-edit.service';
import { TestManagerService } from '../../../../../services/tests/manager/test-manager.service';
import { ComboBoxComponent } from './combo-box/combo-box.component';
import { ToasterService } from '../../../../../../common/services/toaster/toaster.service';

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
    private readonly testEditService: TestEditService,
    private readonly toaster: ToasterService
  ) {
    this.testEditService.settingsLoaded$
      .pipe(takeUntilDestroyed())
      .subscribe((settings) => {
        this.settingsFormGroup.setValue(settings);
      });

    this.testEditService.codeLoaded$
      .pipe(takeUntilDestroyed())
      .subscribe((code) => {
        this.codeForm.setValue(code);
      });
  }

  ngOnInit(): void {
    this.questionBaseApiService.getUsersQuestionBases().subscribe((names) => {
      this.usersQuestionBases = names;
      this.loadSettingsAndCode();
    });
  }

  private loadSettingsAndCode(): void {
    this.testEditService.loadTestSettings(
      this.testManagerService.getSelectedTestName()!
    );

    this.testEditService.loadTestCode(
      this.testManagerService.getSelectedTestName()!
    );
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

  codeForm = new FormControl<string | null>(null);

  ngOnDestroy(): void {
    this.testManagerService.selectTestName(null);
  }

  saveSettings(): void {
    if (!this.checkIfSettingsAreValidAndDisplayErrors(false)) {
      return;
    }

    const settings: TestSettings = {
      questionCount: this.settingsFormGroup.value.questionCount!,
      usedQuestionBases: this.settingsFormGroup.value.usedQuestionBases!,
    };

    this.testEditService
      .saveTestSettings(
        this.testManagerService.getSelectedTestName()!,
        settings
      )
      .subscribe();
  }

  generateCode(): void {
    if (!this.checkIfSettingsAreValidAndDisplayErrors(true)) {
      return;
    }

    this.testEditService.generateTestCodeAndLoadCode(
      this.testManagerService.getSelectedTestName()!
    );
  }

  checkIfSettingsAreValidAndDisplayErrors(
    checkForQuestionBases: boolean
  ): boolean {
    if (
      checkForQuestionBases &&
      (this.settingsFormGroup.value.usedQuestionBases!.length < 1 ||
        this.settingsFormGroup.value.usedQuestionBases == null ||
        this.settingsFormGroup.value.usedQuestionBases == undefined)
    ) {
      this.toaster.displayError('Nie wybrano żadnych baz pytań');
      return false;
    }

    if (this.settingsFormGroup.controls.questionCount.invalid) {
      this.toaster.displayError('Niepoprawna liczba pytań');
      return false;
    }

    return true;
  }
}
