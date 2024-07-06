import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedQuesitonBaseSingletonService {
  getSelectedQuestionBaseName(): string | null {
    return sessionStorage.getItem('selectedQuestionBaseName');
  }

  setSelectedQuestionBaseName(questionBaseName: string | null): void {
    if (questionBaseName == null) {
      sessionStorage.removeItem('selectedQuestionBaseName');
      return;
    }

    sessionStorage.setItem('selectedQuestionBaseName', questionBaseName);
  }

  isAnyQuestionBaseSelected(): boolean {
    return sessionStorage.getItem('selectedQuestionBaseName') != null;
  }
}
