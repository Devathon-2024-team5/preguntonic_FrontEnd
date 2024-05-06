import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, afterNextRender, inject, input, signal } from '@angular/core';


@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  // private readonly _cdRef = inject(ChangeDetectorRef);
  // private readonly _cdRef = inject(ChangeDetectorRef);
  // initValue = signal<number>(30);
  // timer = signal<number>(this.initValue() ?? 30)
  // timerInterval?: NodeJS.Timeout;

  // constructor() {
  //   afterNextRender(() => {
  //     this.timerInterval = setInterval(
  //       () => this.initLoader(),
  //       1000
  //     );
  //   });
  // }

  // private initLoader(): void {
  //   this.initValue.update(prev => prev - 1);

  //   if (this.initValue() === 0)  ;

  //   this._cdRef.detectChanges();
  // }

}
