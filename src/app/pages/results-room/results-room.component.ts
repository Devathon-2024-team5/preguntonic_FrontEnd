import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InGameLayoutComponent } from '../../layout/in-game-layout/in-game-layout.component';
import { RouterOutlet } from '@angular/router';
import JSConfetti  from 'js-confetti';

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
export class ResultsRoomComponent implements OnInit {
  ngOnInit(): void {
    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti()
    throw new Error('Method not implemented.');
  }
}
