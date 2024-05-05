import { Pipe, PipeTransform } from '@angular/core';
import { IPlayer } from '../../store/models/IPlayers.state';

@Pipe({
  name: 'filterPlayers',
  standalone: true,
  pure: false,
})
export class FilterPlayersPipe implements PipeTransform {

  transform(players: IPlayer[] | null, id: string | null): IPlayer[] | never {
    if (!players) throw new Error('Players not found');
    console.log('este ID',id);
    console.log(players.filter(p => p.playerId !== id));
    return players.filter(p => p.playerId !== id);
  }

}
