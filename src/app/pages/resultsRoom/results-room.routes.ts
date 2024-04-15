import { Routes } from '@angular/router';
import { ResultsRoomComponent } from './resultsRoom.component';

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
          import('./views/previousResult/previousResult.component').then(
            m => m.PreviousResultComponent
          ),
      },
      {
        path: 'final-results',
        loadComponent: () =>
          import('./views/finalResults/finalResults.component').then(
            m => m.FinalResultsComponent
          ),
      },
    ],
  },
];
