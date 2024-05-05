import { Injectable } from '@angular/core';
import { of, Observable, delay } from 'rxjs';
import { IPlayer } from '../../store/models/IPlayers.state';
import { IGameState, IQuestion } from '../../store/models/IGame.state';

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

  public executeNgrxGameTest(): Observable<
    Pick<IGameState, 'currentQuestion' | 'questions'>
  > {
    const question: IQuestion = {
      question: 'What is the capital of France?',
      answers: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 0,
    };
    return of({ questions: [question], currentQuestion: 0 }).pipe(delay(3000));
  }
}
