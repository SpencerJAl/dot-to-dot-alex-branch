import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AF} from '../providers/af';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-my-supplies',
  templateUrl: './my-supplies.component.html',
  styleUrls: ['./my-supplies.component.scss']
})
export class MySuppliesComponent implements OnInit {

  id: string;
  ownedProjects: FirebaseListObservable<any>;
  joinedProjects: FirebaseListObservable<any>;
  projects: FirebaseListObservable<any>;
  myJoinProjects: FirebaseListObservable<any>;
  projectRequests: FirebaseListObservable<any>;
  user: FirebaseListObservable<any>;
  myuserId;
  /*Tells af.ts which public exports are needed */
  myProj;
  joinProj ;


  constructor(private afService: AF, private afAuth: AngularFireAuth, private db: AngularFireDatabase,
              private router: Router, private route: ActivatedRoute) { /*searchs the database for information */
    this.user = db.list('registeredUsers/');
    this.myuserId = this.afService.userID;
    /* this.ownedProjects = db.database.list('registeredUsers/joinedProjects/');*/
    // this.ownedProjects = db.list(`registeredUsers/id/ownedProjects/${this.route.snapshot.params['name']}`);
    this.ownedProjects = this.afService.ownedSuppliers;
    /* this.ownedProjects.subscribe((p) => {
       this.myProj = this.afService.getProject(p);
       console.log(this.myProj);
     });
 */
    this.projectRequests = this.afService.getAllProjectRequests();
    this.projects = this.afService.suppliers;
    this.joinedProjects = this.afService.getJoinedProjects();

    this.myJoinProjects = db.list('registeredUsers/id/joinedProjects/' + this.route.snapshot.params['id']);
    /*--
    this.joinedProjects.subscribe((j) => {
      this.joinProj = j;
      console.log(this.joinProj);
    });*/
  }
  ngOnInit() {
    console.log('User is' + this.afService.getUsers());
    this.joinedProjects = this.afService.joinedProjects;
    this.id = this.route.snapshot.params['id'];
    console.log('Params are' + this.id);
  }

}
