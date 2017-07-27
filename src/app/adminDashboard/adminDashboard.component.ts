import {Component, OnInit} from "@angular/core";
import {FirebaseListObservable, AngularFireDatabase} from "angularfire2/database";
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
  constructor(private afService: AF, private router: Router, private af: AngularFireDatabase) {
    this.users=af.list('registeredUsers/');
    this.projectRequests= af.list('projectRequests/');
  }
  remove(id){
    console.log("remove works");
    this.af.object('registeredUsers/'+id).set({
      status:"deleted"
    });
  }

  archive(id){
    console.log("archive works");
    console.log("id is "+id);
    this.af.object('registeredUsers/'+id).update({
      status:"archived"
    });
  }

  promote(id){
    this.af.object('registeredUsers/'+id).update({
      type:"admin"
    });
  }
}
