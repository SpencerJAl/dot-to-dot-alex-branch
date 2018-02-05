/**
 * Created by davem on 04/02/2018.
 */
import {Component, Input} from "@angular/core";
import {FaceBookPostsService} from "../providers/facebook-graph-service.service";


@Component({
  selector:'post-list',
  template: `
            <table class="lessons-list card card-strong">
                <tr *ngFor="let post of posts">
                    
                    <td>
                    <fb-post  href="{{post.permalink_url}}" ></fb-post>
                    </td>
                   
                </tr>
           </table>
        `
})
export class PostsList {


  @Input()
  posts = [];


  constructor(private postsService: FaceBookPostsService) {

  }




}
