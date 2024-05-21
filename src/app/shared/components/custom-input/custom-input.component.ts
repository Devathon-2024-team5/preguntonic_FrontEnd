import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
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
export class CustomInputComponent implements OnChanges{
  @Input() inputConfig: IInputConfig = {} as IInputConfig;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>;
  
  errorValidation = signal(false);

  onValueChange(event:string){
    this.inputConfig.value = event;
    this.valueChange.emit(this.inputConfig.value);
  }

  onBlur() {
    this.inputConfig.value.trim() === ''
      ? this.errorValidation.set(true)
      : this.errorValidation.set(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["inputConfig"].currentValue.hasValidationError && this.inputConfig.value.trim() === '') {
      this.errorValidation.set(true);
    }
  }
}
