import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StartService } from '../../../../services/start/start.service';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  constructor(private readonly startService: StartService) {}

  dataFormGroup = new FormGroup({
    code: new FormControl<string>('', Validators.required),
    username: new FormControl<string>('', Validators.required),
  });

  startTest(): void {
    this.startService.loadQuestionSet(this.dataFormGroup.value.code!);
  }
}
