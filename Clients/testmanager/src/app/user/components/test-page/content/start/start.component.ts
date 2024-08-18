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
import { UsernameSingletonService } from '../../../../services/singletons/username-singleton.service';

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
    private readonly usernameSingleton: UsernameSingletonService
  ) {
    this.startService.questionSetLoaded$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.router.navigateByUrl('test/interface');
        this.usernameSingleton.setUsername(this.dataFormGroup.value.username!);
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
