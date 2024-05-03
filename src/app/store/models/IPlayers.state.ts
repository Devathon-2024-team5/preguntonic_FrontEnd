export interface IPlayer {
    playerId: string;
    playerName: string;
    score: number;
    avatar: string;
    isReady: boolean;
  }


  export interface IPlayersState {
    players: IPlayer[];
    currentPlayer: Pick<IPlayer, 'avatar' | 'playerName'>;
    isLoading: boolean;
    error: string | null;
 }
