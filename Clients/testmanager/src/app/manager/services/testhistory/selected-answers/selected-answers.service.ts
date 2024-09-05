import { Injectable } from '@angular/core';
import { SelectedAnswersApiService } from './selected-answers-api.service';
import { ContentSelectedAnswers } from '../../../models/types/contentSelectedAnswers';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SelectedAnswersService {
  constructor(
    private readonly apiService: SelectedAnswersApiService,
    private readonly router: Router
  ) {}

  private contentSelectedAnswers: ContentSelectedAnswers | null = null;

  //API

  loadSelectedAnswers(testHistoryId: number): void {
    this.apiService
      .getSelectedAnswers(testHistoryId)
      .subscribe((selectedAnswers) => {
        this.contentSelectedAnswers = selectedAnswers;
        this.router.navigateByUrl('home/test-history/selectedanswers');
      });
  }

  //NON API

  getContentSelectedAnswers(): ContentSelectedAnswers | null {
    return this.contentSelectedAnswers;
  }

  goToSelectedAnswers(testHistoryId: number): void {
    this.loadSelectedAnswers(testHistoryId);
  }
}
