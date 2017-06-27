import {OnInit, Component} from "@angular/core";
import {FirebaseObjectObservable} from "angularfire2/index";
import {AF} from "../providers/af";
import {Router} from "@angular/router";
/**
 * Created by James on 22/05/2017.
 */
@Component({
  selector: 'myProfile-root',
  templateUrl: 'myProfile.component.html',
  styleUrls: ['myProfile.component.css']
})


export class MyProfileComponent implements OnInit {
  user: FirebaseObjectObservable<any>

  constructor(private afService: AF, private router: Router) {
    this.user=this.afService.user;
  }

  ngOnInit(){}
}
