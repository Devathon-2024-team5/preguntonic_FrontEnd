import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IPlayer } from '../../store/models/IPlayers.state';

@Injectable({
  providedIn: 'root',
})
export class NgrxTestService {
  public executeNgrxPlayersTest(): Observable<IPlayer[]> {
    const player: IPlayer = {
      playerName: 'unknown',
      admin: false,
      avatar: 'unknown',
      readyForNextQuestion: false,
      score: 0,
      ipAddress: 'unknown',
      playerId: 'unknown',
      responded: false,
      responseId: 'unknown',
      responseTime: 0,
      status: 'IN_LOBBY_UNREADY',
    };

    return of([player]);
  }

}
