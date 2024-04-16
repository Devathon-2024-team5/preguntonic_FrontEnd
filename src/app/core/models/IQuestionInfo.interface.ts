 export interface IAnswerInfo {
  answers: string[];
  correctAnswer: number;
}

export interface IQuestionInfo {
  question: string;
  numberQuestion: number;
}

export interface Ia {
  question: IQuestionInfo;
  answer: IAnswerInfo;
}
