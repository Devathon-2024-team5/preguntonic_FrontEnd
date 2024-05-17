import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandlerService } from '../../core/services/global-error-handler.service';

const errorHandlingProviders = [
  {
    provide: ErrorHandler,
    useClass: GlobalErrorHandlerService,
  },
];

export default errorHandlingProviders;
