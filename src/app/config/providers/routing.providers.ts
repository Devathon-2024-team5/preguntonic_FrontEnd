import {
  provideRouter,
  withViewTransitions,
  withComponentInputBinding,
} from '@angular/router';
import { routes } from '../../app.routes';

const routingProviders = [
  provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
];

export default routingProviders;
