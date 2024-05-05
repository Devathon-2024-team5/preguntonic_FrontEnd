import { Pipe, PipeTransform } from '@angular/core';
import { IPlayer } from '../../store/models/IPlayers.state';

@Pipe({
  name: 'numberOfReady',
  standalone: true
})
export class NumberOfReadyPipe implements PipeTransform {

  transform(players: IPlayer[]): unknown {
    return players.filter(p => p.readyForNextQuestion).length;
  }

}
