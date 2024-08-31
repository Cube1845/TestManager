import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StartDateSingletonService {
  setStartDate(stringDate: string | null): void {
    if (stringDate == null) {
      sessionStorage.removeItem('startDate');
    }

    sessionStorage.setItem('startDate', stringDate!);
  }

  getStartDate(): string | null {
    return sessionStorage.getItem('startDate');
  }
}
