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
      .get('https://graph.facebook.com/v2.12/D2DMARYHILL/posts?fields=permalink_url&access_token=EAAWw8uiEZCIMBAPACpsnJJyyiHFBKPPbeSicqukNy6gBtRwJhdtYINZBym88mpUMLSZC7NZBVYppIONA7AGBuHmopFbZCL4ZCbsdVYEKwyaCVWnYRC6j9wjBOEDgS4n1LvHGJCqHBHwKpNZC3nvJYmZBhh6bpw7VZAGGD1h3fd1L4vNoZAxbTmn7pO')
      .map((res) => res.json())
      ;


}
}
