import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable, Operator} from 'rxjs';
import {Post, List} from './posts';
import {FacebookService}from 'ngx-facebook';
//import {List} from '';
@Injectable()
export class FaceBookPostsService {
 // public posts=[];
  constructor(private http: Http, private fb:FacebookService) {



  }

  getPosts()   {
    return this.http
      .get('https://graph.facebook.com/v2.12/D2DMARYHILL/posts?fields=permalink_url&access_token=EAACEdEose0cBAIgaA5JDSrvsf8Byn91wBZCNDhIr2u8KeCR78bez6BBCQig2Vdx3izyM7Io99YYoBEZAueT6Ui5TnXW33SZBfqUgypi6ewwhoEMaDBhkiHFf8mJBhZAZBvnMSTM0TCTMhQcT9UMlkWSy2K3mRbjA1VHPUpEuDxPGs8hYvw6OCjgclZA2ZAxHHj8Jc6IZBep3hwZDZD')
      .map((res) => res.json())
      ;


}
}
