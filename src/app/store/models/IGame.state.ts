export interface IQuestion {
  question: string;
  answers: string[];
  correctAnswer: number | null;
}

export interface IGameState {
  questions: IQuestion[];
  currentQuestion: number;
  isLoading: boolean;
  error: string | null;
}
