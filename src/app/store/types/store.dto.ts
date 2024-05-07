import { IAnswer, IGameState, IQuestion } from '../models/IGame.state';
import { IPlayer, IPlayerInGame } from '../models/IPlayers.state';

export type GameConfigDTO = Pick<IGameState, 'maxPlayers' | 'numOfQuestions'>;

export type PlayerDTO = Pick<IPlayer, 'avatar' | 'playerName'>;

export type PlayerresultDTO = Pick<IPlayer, 'avatar' | 'playerName' | 'score'>;

export type TopPlayer = Pick<IPlayer, 'avatar' | 'playerName' | 'score'>;

export type QuestionDTO = Pick<IQuestion, 'question' | 'correctAnswer'>;

export type ResponseQuestionDTO = {
  correct_answer_id: string;
  players: IPlayerInGame[];
  question: {
    answers: IAnswer[];
    ordinal: number;
    question: string;
  };
};

export type QuestionsGameDto = {
  current_question: {
    id: string;
    answers: IAnswer[];
    ordinal: number;
    question: string;
  };
  num_questions: string;
  status: string;
  players: IPlayerInGame[];
};

export type StatusPlayer =
  | 'IN_LOBBY_UNREADY'
  | 'IN_LOBBY_READY'
  | 'IN_GAME'
  | 'IN_RESULTS';

export type EventGame = 'JOIN' | 'READY' | 'UNREADY' | 'START_GAME';
