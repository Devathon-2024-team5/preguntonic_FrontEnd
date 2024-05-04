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
  roomCode: string;
  isLoading: boolean;
  error: string | null;
}
