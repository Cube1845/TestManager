import { Question } from '../../../../global/types/question';

export type UpdateQuestionInQuestionBaseDTO = {
  questionBaseName: string;
  questionIndex: number;
  updatedQuestion: Question;
};
