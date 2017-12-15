import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(value: any, searchString: string, propName: string): any {
    if(value.length ==0){
    	return value;
  	}  		
  	var resultArray = []
  	for(var item of value){

  		if(item[propName].toUpperCase().includes(searchString.toUpperCase())) {
  			resultArray.push(item);
  		}
  	}
  	return resultArray;

  }

}
