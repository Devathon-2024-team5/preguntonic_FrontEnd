import { IGameState, IQuestion } from '../models/IGame.state';
import { IPlayer } from '../models/IPlayers.state';

export type GameConfigDTO = Pick<IGameState, 'maxPlayers' | 'numOfQuestions'>;

export type PlayerDTO = Pick<IPlayer, 'avatar' | 'playerName'>;

export type QuestionDTO = Pick<IQuestion, 'question' | 'correctAnswer'>

export type StatusPlayer =
  | 'IN_LOBBY_UNREADY'
  | 'IN_LOBBY_READY'
  | 'IN_GAME'
  | 'IN_RESULTS';

export type EventGame = 
  | 'JOIN'
  | 'READY'
  | 'UNREADY'
  | 'START_GAME';
