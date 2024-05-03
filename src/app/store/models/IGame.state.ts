export interface IQuestion {
  question: string;
  answers: string[];
  correctAnswer: number | null;
}

export interface IGameState {
  maxPlayers:number;
  numOfQuestion:number;
  questions: IQuestion[];
  currentQuestion: number;
  isLoading: boolean;
  error: string | null;
}
