import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './progressBar.component.html',
  styleUrl: './progressBar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnDestroy {
  labelBar = input<string>();
  progress = signal<number>(0);
  private _loaderTimer?: NodeJS.Timeout;
  private _speedLoader = 150;
  private readonly _cdRef = inject(ChangeDetectorRef);

  constructor() {
    afterNextRender(() => {
      this._loaderTimer = setInterval(
        () => this.initLoader(),
        this._speedLoader
      );
    });
  }

  public initLoader(): void {
    this.progress.set(this.progress() + 1);

    if (this.progress() === 50) this.stopLoader();

    this._cdRef.detectChanges();
  }

  private stopLoader(): void {
    clearInterval(this?._loaderTimer);
    this.progress.set(100);
  }

  ngOnDestroy(): void {
    clearInterval(this?._loaderTimer);
  }
}
