import { Pipe, PipeTransform } from '@angular/core';
import { IPlayer } from '../../store/models/IPlayers.state';

@Pipe({
  name: 'filterPlayers',
  standalone: true,
  pure: true,
})
export class FilterPlayersPipe implements PipeTransform {

  transform(players: IPlayer[] | null, id: string | null): IPlayer[] | never {
    if (!players) throw new Error('List players is empty');

    return players.filter(p => p.playerId !== id);
  }

}
