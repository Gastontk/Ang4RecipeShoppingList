import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphaSort',
//add the following to force Angular to recalculate ANY time page info changes. IE when a new server is added to the array, it will catch that. Without this, the changes won't be filteed until the filter var is changed (someone types in the value field)
  pure: true,


})
export class AlphaSortPipe implements PipeTransform {


  transform(array: Array<string>): Array<string> {
    array.sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}