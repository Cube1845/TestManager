import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IdentifiedAnswer } from '../../../../../models/types/identifiedAnswer';
import { NgStyle } from '@angular/common';
import { AnswerTileColorService } from '../../../../../services/cosmetics/answer-tile-color.service';

@Component({
  selector: 'app-question-content',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './question-content.component.html',
  styleUrl: './question-content.component.scss',
})
export class QuestionContentComponent {
  constructor(
    private readonly answerTileColorService: AnswerTileColorService
  ) {}

  @Input({ required: true }) questionContent!: string;
  @Input({ required: true }) answers!: IdentifiedAnswer[];

  @Output() answerClicked = new EventEmitter<number>();

  getValidColor(index: number): string {
    return this.answerTileColorService.getValidColor(index);
  }

  setHoveredAnswerTile(index: number): void {
    this.answerTileColorService.setHoveredAnswerTile(index);
  }

  answerTileClicked(index: number): void {
    this.answerClicked.emit(index);
  }
}
