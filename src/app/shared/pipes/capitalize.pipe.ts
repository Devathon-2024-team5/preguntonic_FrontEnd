import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  private readonly errorMessage = 'Invalid input for CapitalizePipe';

  transform(value: string): string | never {
    if (!value.trim() || typeof value !== 'string')
      throw new Error(this.errorMessage);

    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
