interface IQuestion {
  question: string;
  answers: string[];
  correctAnswer: number | null;
}

export interface IGameState {
  questions: IQuestion[];
}
