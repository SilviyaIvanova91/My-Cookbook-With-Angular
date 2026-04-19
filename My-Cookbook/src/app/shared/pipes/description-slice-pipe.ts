import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionSlice',
})
export class DescriptionSlicePipe implements PipeTransform {
  transform(description: string, maxLength: number = 100): string {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + '...';
  }
}
