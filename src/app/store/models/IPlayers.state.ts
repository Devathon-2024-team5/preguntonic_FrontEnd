export interface IPlayer {
    id: string;
    name: string;
    score: number;
    avatar: string;
    isReady: boolean;
  }


  export interface IPlayersState {
    players: IPlayer[];
    currentPlayer: Pick<IPlayer, 'avatar' | 'name'>;
    isLoading: boolean;
    error: string | null;
 }
