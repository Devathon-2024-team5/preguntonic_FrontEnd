import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoTitleComponent } from '../../../../shared/components/logo-title/logo-title.component';
import { PodiumComponent } from '../../../../components/podium/podium.component';
import { BtnBasicComponent } from '../../../../shared/components/btn-basic/btn-basic.component';

//  TODO implements Presentational container for consume and share data
@Component({
  selector: 'app-final-results',
  standalone: true,
  imports: [
    LogoTitleComponent,
    PodiumComponent,
    BtnBasicComponent,
  ],
  templateUrl: './final-results.component.html',
  styleUrl: './final-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalResultsComponent {
  readonly controlBtns = ['volver a jugar', 'salir'];

  public fnTest (): void {
    console.log('Successful shipped function');
  }
}
