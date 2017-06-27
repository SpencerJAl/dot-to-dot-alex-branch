import {Component, OnInit} from "@angular/core";
import {FirebaseListObservable, AngularFire} from "angularfire2/index";
import {Router} from "@angular/router";
import {AF} from "../providers/af";
/**
 * Created by James on 05/06/2017.
 */
@Component({
  selector: 'app-adminDashboard',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users: FirebaseListObservable<any>;
  projectRequests: FirebaseListObservable<any>;

  ngOnInit(){
    console.log(this.afService.getUsers());
  }
  constructor(private afService: AF, private router: Router, private af: AngularFire) {
    this.users=af.database.list('registeredUsers/');
    this.projectRequests= af.database.list('projectRequests/');
  }
  remove(m){
    console.log("remove works");
  }
  archive(m){
    console.log("archive works");
    console.log("id is "+m);
  }
}
