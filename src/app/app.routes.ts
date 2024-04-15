import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   title: 'Preguntonic | Home',
  // },
  // {
  //   path: 'waiting-room',
  //   loadComponent: () =>
  //     import('./Pages/waiting-room/waiting-room.component').then(
  //       m => m.WaitingRoomComponent
  //     ),
  //   title: 'Preguntonic | Waiting room',
  // },
  {
    path: 'game-room',
    loadComponent: () =>
      import('./pages/gameRoom/gameRoom.component').then(
        m => m.GameRoomComponent
      ),
    title: 'Preguntonic | Game room',
  },
  {
    path: 'results-room',
    loadChildren: () =>
      import('./pages/resultsRoom/results-room.routes').then(
        m => m.RESULTS_ROUTES
      ),
    title: 'Preguntonic | Results room',
  },
  // {
  //   path: '**',
  //   loadComponent: () =>
  //     import('./Pages/not-found/not-found.component').then(
  //       m => m.NotFoundComponent
  //     ),
  //   title: 'Preguntonic | Not found 404',
  // },
];
