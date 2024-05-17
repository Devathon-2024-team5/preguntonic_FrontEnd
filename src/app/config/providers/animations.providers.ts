import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

const animationsProviders = [
  provideAnimations(),
  provideToastr({
    preventDuplicates: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    progressAnimation: 'decreasing',
    countDuplicates: true,
  }),
];

export default animationsProviders;
