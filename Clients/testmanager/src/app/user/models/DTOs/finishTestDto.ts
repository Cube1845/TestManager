import { SelectedAnswer } from '../types/selectedAnswer';

export type FinishTestDTO = {
  testId: number;
  username: string;
  selectedAnswers: SelectedAnswer[];
};
