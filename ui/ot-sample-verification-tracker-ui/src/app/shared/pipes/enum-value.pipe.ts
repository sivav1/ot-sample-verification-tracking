import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumValuePipe',
})
export class EnumValuePipe implements PipeTransform {
  transform(value: number | null, enumObject: any): string {
    if(value === null) {
      return '';
    }
    return enumObject[value];
  }

}
