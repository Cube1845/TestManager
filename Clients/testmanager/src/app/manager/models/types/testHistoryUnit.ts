import { Score } from '../../../common/models/types/score';
import { SelectedAnswer } from '../../../common/models/types/selectedAnswer';

export type TestHistoryUnit = {
  username: string;
  selectedAnswers: SelectedAnswer[];
  score: Score;
  startDate: string;
  finishDate: string;
  testHistoryId: number;
};
