import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-final-results',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './final-results.component.html',
  styleUrl: './final-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalResultsComponent { }
