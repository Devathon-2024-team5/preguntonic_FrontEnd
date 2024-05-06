export interface IAnswer {
  id: string;
  answer: string;
} 

export interface IQuestion {
  question: string;
  answers: IAnswer[];
  correctAnswer: string | null;
}

export interface IGameState {
  maxPlayers:number;
  numOfQuestions:number;
  question: IQuestion;
  currentQuestion: number;
  roomCode: string;
  isLoading: boolean;
  error: string | null;
}
