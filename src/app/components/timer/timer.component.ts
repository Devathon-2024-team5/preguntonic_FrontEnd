import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  initValue = input<number>();
  timer = signal<number>(this.initValue() ?? 30)
  timerInterval?: NodeJS.Timeout;

  constructor() {
    effect(() => {
      if (this.timer() === 0) {
        clearInterval(this.timerInterval)
      }
    })
  }

  public initTimer(): void {
    setInterval(() => {
      this.timer.set(this.timer() - 1)
    })
  }
}
