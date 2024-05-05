import { IGameState } from '../models/IGame.state';
import { IPlayer } from '../models/IPlayers.state';

export type GameConfigDTO = Pick<IGameState, 'maxPlayers' | 'numOfQuestion'>;

export type PlayerDTO = Pick<IPlayer, 'avatar' | 'playerName'>;

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
