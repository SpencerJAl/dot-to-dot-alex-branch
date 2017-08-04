import { Pipe, PipeTransform } from '@angular/core';
//import{af} from "../providers/af"

@Pipe({
  name: 'scienceFilter'
})
export class ScienceFilterPipe implements PipeTransform {
  icon: any;

  transform(science:string, args?: any):string {

    return null;
  }

}
