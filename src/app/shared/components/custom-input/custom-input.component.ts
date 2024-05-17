import { Component, Input } from '@angular/core';
import { IInputConfig } from '../../interfaces/InputConfig.interface';


@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css'
})
export class CustomInputComponent {
  @Input() inputConfig: IInputConfig = {} as IInputConfig;
}
