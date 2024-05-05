import { IGameState } from '../models/IGame.state';
import { IPlayer } from '../models/IPlayers.state';

export type GameConfigDTO = Pick<IGameState, 'maxPlayers' | 'numOfQuestion'>;

export type PlayerDTO = Pick<IPlayer, 'avatar' | 'playerName'>;

export type StatusGame =
  | 'IN_LOBBY_UNREADY'
  | 'IN_LOBBY_READY'
  | 'IN_GAME'
  | 'IN_RESULTS';
