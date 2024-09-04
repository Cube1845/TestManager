import { SelectedAnswer } from '../../../common/models/types/selectedAnswer';

export type FinishTestDTO = {
  startDate: string;
  testId: number;
  username: string;
  selectedAnswers: SelectedAnswer[];
};
