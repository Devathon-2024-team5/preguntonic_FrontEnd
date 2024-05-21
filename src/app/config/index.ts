import animationsProviders from './providers/animations.providers';
import httpProviders from './providers/http.providers';
import routingProviders from './providers/routing.providers';
import stateManagementProviders from './providers/stateManagement.providers';
import errorHandlingProviders from './providers/errorHandling.providers';
import { provideClientHydration } from '@angular/platform-browser';

const APP_PROVIDERS = [
  provideClientHydration(),
  ...routingProviders,
  ...httpProviders,
  ...stateManagementProviders,
  ...animationsProviders,
  ...errorHandlingProviders,
];

export default APP_PROVIDERS;
