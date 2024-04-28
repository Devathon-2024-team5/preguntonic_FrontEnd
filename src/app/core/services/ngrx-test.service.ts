import { Injectable } from '@angular/core';
import { of, Observable, delay } from 'rxjs';
import { IPlayer,  } from '../../store/models/IPlayers.state';
import { IGameState, IQuestion } from '../../store/models/IGame.state';

@Injectable({
  providedIn: 'root',
})
export class NgrxTestService {
  public executeNgrxPlayersTest(): Observable<IPlayer[]> {
    const player: IPlayer = {
      id: 'as45',
      avatar: 'as',
      name: 'Jhon Doe',
      score: 3000,
      isReady: false,
    }
    return of([player]);
  }

  public executeNgrxGameTest(): Observable<Pick<IGameState, 'currentQuestion'|'questions'>> {
    const question: IQuestion = {
      question: 'What is the capital of France?',
      answers: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 0,
    }
    return of({questions: [question], currentQuestion: 0}).pipe(delay(3000));
  }
}
