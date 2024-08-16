import { Question } from '../../types/question';

export type UpdateQuestionInQuestionBaseDTO = {
  questionBaseName: string;
  questionIndex: number;
  updatedQuestion: Question;
};
