import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../../app.routes';
import { RESULTS_ROUTES } from '../../pages/results-room/results-room.routes'
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-navbar-daily',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    CapitalizePipe
  ],
  templateUrl: './navbar-daily.component.html',
  styleUrl: './navbar-daily.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarDailyComponent implements OnInit  {
  viewPages: (string | undefined)[] = [];

  ngOnInit(): void {
    const routes1 = routes.map(route => route?.path);
    const routes2 = RESULTS_ROUTES[0].children?.map(route => route.path) ?? [];

    this.viewPages = [...routes1, ...routes2].filter(r => (r !== 'results-room' && r !== ''));
  }
}
