import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InGameLayoutComponent } from '../../layout/in-game-layout/in-game-layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-results-room',
  standalone: true,
  imports: [InGameLayoutComponent, RouterOutlet],
  template: '<app-in-game-layout><router-outlet /></app-in-game-layout>',
  styles: `
    :host {
      display: contents;
    }

    router-outlet {
      display: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsRoomComponent {}
