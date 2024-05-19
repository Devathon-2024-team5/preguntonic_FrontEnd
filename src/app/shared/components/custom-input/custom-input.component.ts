import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
  classes: string[] = [];

  onValueChange(event:any){
    this.inputConfig.value = event;
    this.valueChange.emit(this.inputConfig.value);
  }

  updateClassesToApply() {
    this.classes = ['c-input'];
    if(this.inputConfig.hasValidationError) {
      this.classes.push('c-input--invalid')
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const hasValidationErrorChange = changes["inputConfig"].currentValue?.hasValidationError !== changes["inputConfig"].previousValue?.hasValidationError;
    if(hasValidationErrorChange) {
      this.updateClassesToApply();
    }
  }
}
