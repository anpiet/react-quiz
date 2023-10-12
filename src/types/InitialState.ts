import { QuestionType } from './QuestionType';

export type InitialState = {
  questions: QuestionType[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  answer: number | null;
  points: number;
  secondsRemaining: number;
};
