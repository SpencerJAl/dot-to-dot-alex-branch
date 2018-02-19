import { Component, OnInit } from '@angular/core';
import {FacebookService, InitParams} from 'ngx-facebook';
import {FaceBookPostsService} from'../providers/facebook-graph-service.service';
import {Observable} from 'rxjs';
import {Post} from '../providers/posts';
import {PostsList}from './facebook-posts-list';

@Component({
  selector: 'app-facebook-posts',
  templateUrl: './facebook-posts.component.html',
  styleUrls: ['./facebook-posts.component.scss']
})
export class FacebookPostsComponent implements OnInit {

  posts=[];
  results: Array<Post>;
  error:any;
  facebook:any;
  constructor(private fb: FacebookService, private fbPost:FaceBookPostsService) {
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.
    let initParams: InitParams = {
      appId: '1601932213156995',
      xfbml: true,
      version: 'v2.8'
    };
    fb.init(initParams);

    /*
    fbPost.getPosts()
      .subscribe(result=> {this.posts = result;
 console.log('returned data from facebook');
 console.log( this.posts);}, err=> console.log(err));
 */
    console.log( 'post have this value'+this.posts);

  }
  ngOnInit() {
    this.fbPost.getPosts().subscribe(
      data => { this.results = <Post[]>data;
      console.log(this.results);
        for (let i of data){

          console.log('url is ' + i.permalink_url);}
      },

      error => console.log(error)
    );
    console.log('Posts after  initialization');
    console.log(this.results);
    //this.posts = this.getPosts;

    //console.log(this.posts);
  }

  getPosts() {
    //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedFunction
    this.fb.api('/D2DMARYHILL/posts?fields=permalink_url')
      .then((res: any) => {
        console.log('Got the posts', res);
        return res;
      })
      .catch(this.handleError);
  }

private handleError(error) {
  console.error('Error processing action', error);
}
}
