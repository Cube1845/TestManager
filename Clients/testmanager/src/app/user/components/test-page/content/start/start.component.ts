import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StartService } from '../../../../services/start/start.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataSingletonService } from '../../../../services/singletons/data-singleton.service';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  constructor(
    private readonly startService: StartService,
    private readonly router: Router,
    private readonly dataSingleton: DataSingletonService
  ) {
    this.startService.questionSetLoaded$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.router.navigateByUrl('test/interface');
        this.dataSingleton.setUsername(this.dataFormGroup.value.username!);
      });
  }

  dataFormGroup = new FormGroup({
    code: new FormControl<string>('', Validators.required),
    username: new FormControl<string>('', Validators.required),
  });

  startTest(): void {
    this.startService.loadQuestionSet(this.dataFormGroup.value.code!);
  }
}
