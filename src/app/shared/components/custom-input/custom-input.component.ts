import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IInputConfig } from '../../interfaces/InputConfig.interface';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [NgClass,FormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css'
})
export class CustomInputComponent {
  @Input() inputConfig: IInputConfig = {} as IInputConfig;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>;

  onValueChange(event:any){
    this.inputConfig.value = event;
    this.valueChange.emit(this.inputConfig.value);
  }
}
