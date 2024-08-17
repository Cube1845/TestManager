import { IdentifiedAnswer } from './identifiedAnswer';

export type ProtectedQuestion = {
  questionId: number;
  content: string;
  answers: IdentifiedAnswer[];
};
