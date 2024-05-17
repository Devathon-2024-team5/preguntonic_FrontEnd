import { Injectable } from '@angular/core';
import statusCodeMessages from '../../config/statusCodeMessages';

@Injectable({
  providedIn: 'root',
})
export class HttpStatusHandlerService {

  getStatusCodeMessage(status: number): string {
    return statusCodeMessages.has(status)
      ? statusCodeMessages.get(status) || 'Unknown error' : ''
  }
}
