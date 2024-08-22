import { SelectedAnswer } from '../types/selectedAnswer';

export type FinishTestDTO = {
  username: string;
  selectedAnswers: SelectedAnswer[];
};
