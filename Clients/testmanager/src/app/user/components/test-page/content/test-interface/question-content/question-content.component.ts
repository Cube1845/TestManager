import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-content',
  standalone: true,
  imports: [],
  templateUrl: './question-content.component.html',
  styleUrl: './question-content.component.scss',
})
export class QuestionContentComponent {
  @Input({ required: true }) questionContent!: string;

  @Input({ required: true }) answers!: string[];
}
