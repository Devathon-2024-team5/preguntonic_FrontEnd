import { StatusPlayer } from '../types/store.dto';

export interface IPlayer {
  admin: boolean;
  avatar: string;
  ipAddress: string;
  playerId: string;
  playerName: string;
  readyForNextQuestion: boolean;
  responded: boolean;
  responseId: string;
  responseTime: number;
  score: number;
  status: StatusPlayer;
}

export interface IPlayersState {
  players: IPlayer[];
  isLoading: boolean;
  error: string | null;
}

export interface IPlayerInGame {
  id: string;
  avatar: string;
  is_ready: boolean;
  nickname: string;
  score: number;
}

