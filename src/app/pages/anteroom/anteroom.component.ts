import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { HeaderAnteroomComponent } from './components/header-anteroom/header-anteroom.component';
import { CodeContainerComponent } from './components/code-container/code-container.component';
import { SectionPlayerComponent } from './components/section-player/section-player.component';
import { HomeComponent, Player } from '../home/home.component';
import { CustomButtonComponent } from "../../components/custom-btn/custom-button.component";

@Component({
    selector: 'app-anteroom',
    standalone: true,
    templateUrl: './anteroom.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './anteroom.component.css',
    imports: [
        HeaderAnteroomComponent,
        CodeContainerComponent,
        SectionPlayerComponent,
        HomeComponent,
        CustomButtonComponent
    ]
})
export class AnteroomComponent {
  @Output() avatar: string = '../../../assets/avatar-1.webp';
  @Output() playerName: string = 'Pedro';
  players: Player[] =
  [
      {
        id: 1,
        avatar: '../../../assets/avatar-1.webp',
        name: 'Jugador 1',
        estado: true,
      },
      {
        id:2,
        avatar: '../../../assets/avatar-2.webp',
        name: 'Jugador 2',
        estado: true,
      },
      {
        id: 3,
        avatar: '../../../assets/avatar-3.webp',
        name: 'Jugador 3',
        estado: true,
      },
    ];
}
