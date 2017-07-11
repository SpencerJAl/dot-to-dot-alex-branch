
/**
 * Created by James on 11/07/2017.
 */
import {OnInit, Component} from "@angular/core";
import {FirebaseObjectObservable} from "angularfire2/index";
import {AF} from "../providers/af";
import {Router} from "@angular/router";
/**
 * Created by James on 22/05/2017.
 */
@Component({
  selector: 'app-myProjects',
  templateUrl: 'myProjects.component.html',
  styleUrls: ['myProjects.component.css']
})


export class MyProjectsComponent implements OnInit {

  constructor(private afService: AF, private router: Router) {
  }
  ngOnInit(){}
}
