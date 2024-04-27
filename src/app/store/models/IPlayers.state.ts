export interface IPlayer {
    id: string;
    name: string;
    score: number;
    avatar: string;
}

export interface IPlayersState {
    players: IPlayer[];
    currentPlayer: IPlayer | null;
    isLoading: boolean;
    error: string | null;
 }
