import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IPlayer } from '../../store/models/IPlayers.state';

@Injectable({
  providedIn: 'root',
})
export class NgrxTestService {
  public executeNgrxTest(): Observable<IPlayer[]> {
    const player: IPlayer = {
      id: 'as45',
      avatar: 'as',
      name: 'Jhon Doe',
      score: 3000,
    }
    return of([player]);
  }
}
