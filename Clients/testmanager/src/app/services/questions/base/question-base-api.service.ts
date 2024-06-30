import { Injectable } from '@angular/core';
import { QuestionBase } from '../../../models/types/questionBase';

@Injectable({
  providedIn: 'root',
})
export class QuestionBaseApiService {
  constructor() {}

  getUsersBases(): string[] {
    return ['Bazaaaaa'];
  }
}
