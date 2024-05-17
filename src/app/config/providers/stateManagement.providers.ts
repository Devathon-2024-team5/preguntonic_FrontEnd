import { isDevMode } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ROOT_REDUCERS, AllEffects } from '../../store/app.state';

const stateManagementProviders = [
  provideStore(ROOT_REDUCERS),
  provideEffects(AllEffects),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
];

export default stateManagementProviders;
