import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { errorInterceptor } from '../../core/interceptors/error-interceptor.interceptor';

const httpProviders = [
  provideHttpClient(
    withFetch(),
    withInterceptors([errorInterceptor]),
  )
];

export default httpProviders;
