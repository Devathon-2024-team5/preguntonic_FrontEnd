import {
  ErrorHandler,
  Inject,
  Injectable,
  Injector,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService<T> implements ErrorHandler {
  private errorMessage = 'An unexpected error occurred';

  constructor(@Inject(Injector) private readonly injector: Injector) {}

  private get toastService() {
    return this.injector.get(ToastrService);
  }

  public handleError(error: T): void {
    error instanceof Error
      ? this.toastService.error(error.message, 'Preguntonic')
      : this.toastService.error(this.errorMessage, 'Preguntonic');
  }
}
