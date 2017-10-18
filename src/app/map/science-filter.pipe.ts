import { Pipe, PipeTransform } from '@angular/core';
import{AF} from '../providers/af';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import 'rxjs/add/operator/filter';
import * as _ from 'lodash';

@Pipe({
  name: 'scienceFilter'

})
export class ScienceFilterPipe implements PipeTransform {
  icon: any;

  transform(science:FirebaseListObservable<any>) {


     return science.filter(science => science);
  }

}


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (args) {
      //noinspection TypeScriptUnresolvedFunction
      return _.filter(value, d => _.find(_.valuesIn(d), v =>
        _.toLower(v).indexOf(_.toLower(args)) !== -1));
    }

    return value;
  }
}
