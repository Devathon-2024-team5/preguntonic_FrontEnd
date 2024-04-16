import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { Router } from '@angular/router';
import { IProgressBarConfig } from '../../core/models/IConfigProgressBar.interface';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CapitalizePipe],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnDestroy {
  progress = signal<number>(0);
  configBar = input.required<IProgressBarConfig>();
  private _loaderTimer?: NodeJS.Timeout;
  private _speedLoader = 5000 / 100;
  private readonly _router = inject(Router);
  private readonly _cdRef = inject(ChangeDetectorRef);

  constructor() {
    afterNextRender(() => {
      this._loaderTimer = setInterval(
        () => this.initLoader(),
        this._speedLoader
      );
    });

    effect(() => this.progress() === 100 && this.navigateTo());
  }

  private initLoader(): void {
    this.progress.set(this.progress() + 1);

    if (this.progress() === 80) this.stopLoader();

    this._cdRef.detectChanges();
  }

  private stopLoader(): void {
    clearInterval(this?._loaderTimer);
    this.progress.set(100);
  }

  private navigateTo(): void {
    setTimeout(() => {
      try {
        this._router.navigate([this.configBar().redirectTo]);
      } catch (error) {
        //TODO implement Error or Modal Component to Show the Error
        console.log(error);
      }
    }, this.configBar().delay);
  }

  ngOnDestroy(): void {
    clearInterval(this?._loaderTimer);
  }
}
