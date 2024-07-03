import { Question } from '../types/question';

export type UpdateQuestionInQuestionBaseDTO = {
  questionBaseName: string;
  oldQuestion: Question;
  updatedQuestion: Question;
};
