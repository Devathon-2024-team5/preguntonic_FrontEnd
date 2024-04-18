import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { IBtnData } from '../../../core/models/IBtnData.interface';

@Component({
  selector: 'app-btn-basic',
  standalone: true,
  imports: [CapitalizePipe],
  templateUrl: './btn-basic.component.html',
  styleUrl: './btn-basic.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnBasicComponent {
  btnData = input.required<IBtnData>();
  customStyles = input<Record<string, string>>();

  public btnHandler(): void {
    if (!this.btnData()) return;

    const fnButton = this.btnData()?.buttonFn;
    if (fnButton === undefined) return;

    fnButton();
  }
}
