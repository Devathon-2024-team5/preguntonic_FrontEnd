import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JoinRoomComponent } from './pages/join-room/join-room.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Preguntonic | Home',
  },
  {
    path: 'join-room',
    component: JoinRoomComponent,
    title: 'Preguntonic | join',
  },
  {
    path: 'game-room',
    loadComponent: () =>
      import('./pages/game-room/game-room.component').then(
        m => m.GameRoomComponent
      ),
    title: 'Preguntonic | Game room',
  },
  {
    path: 'results-room',
    loadChildren: () =>
      import('./pages/results-room/results-room.routes').then(
        m => m.RESULTS_ROUTES
      ),
    title: 'Preguntonic | Results room',
  },
   {
     path: 'anteroom',
     loadComponent: () =>
       import('./pages/anteroom/anteroom.component').then(
         m => m.AnteroomComponent
       ),
     title: 'Preguntonic | anteroom',
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
