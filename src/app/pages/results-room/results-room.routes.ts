import { Routes } from '@angular/router';
import { ResultsRoomComponent } from './results-room.component';

export const RESULTS_ROUTES: Routes = [
  {
    path: '',
    component: ResultsRoomComponent,
    children: [
      {
        path: '',
        redirectTo: 'previous-result',
        pathMatch: 'full',
      },
      {
        path: 'previous-result',
        loadComponent: () =>
          import('./views/previous-result/previous-result.component').then(
            m => m.PreviousResultComponent
          ),
      },
      {
        path: 'final-results',
        loadComponent: () =>
          import('./views/final-results/final-results.component').then(
            m => m.FinalResultsComponent
          ),
      },
    ],
  },
];
