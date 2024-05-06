export interface IAnswer {
  id: string;
  answer: string;
}

export interface IQuestion {
  question: string;
  answers: IAnswer[];
  correctAnswer: string | null;
}

export interface ICurrentQuestion {
  id: string;
  answers: IAnswer[];
  ordinal: number;
  question: string;
  timeResponse?: number;
}

export interface IGameState {
  maxPlayers: number;
  numOfQuestions: number;
  question: IQuestion;
  currentQuestion: ICurrentQuestion;
  roomCode: string;
  isLoading: boolean;
  error: string | null;
}
