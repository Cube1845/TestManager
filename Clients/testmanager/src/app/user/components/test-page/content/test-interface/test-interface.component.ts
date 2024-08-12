import { Component } from '@angular/core';
import { QuestionContentComponent } from './question-content/question-content.component';

@Component({
  selector: 'app-test-interface',
  standalone: true,
  imports: [QuestionContentComponent],
  templateUrl: './test-interface.component.html',
  styleUrl: './test-interface.component.scss',
})
export class TestInterfaceComponent {}
