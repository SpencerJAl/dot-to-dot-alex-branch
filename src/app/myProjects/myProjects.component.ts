
/**
 * Created by James on 11/07/2017.
 * Edited by Alexander on 27/07/2017
 * Edited by Dave on 20/01/2018
 */
import {OnInit, Component} from '@angular/core';
import {AF} from '../providers/af';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {Router, ActivatedRoute} from '@angular/router';
import {register} from 'ts-node/dist';
import {forEach} from "@angular/router/src/utils/collection";
/**
 * Created by James on 22/05/2017.
 */
@Component({
  selector: 'app-myProjects',
  templateUrl: './myProjects.component.html',
  styleUrls: ['./myProjects.component.scss']
})

/* Created by Alexander on 12/07/2017 */
export class MyProjectsComponent implements OnInit {
  id: string;
  ownedProjects: FirebaseListObservable<any>;
  joinedProjects: FirebaseListObservable<any>;
  projects:FirebaseListObservable<any>;
  myJoinProjects:FirebaseListObservable<any>;
  projectRequests:FirebaseListObservable<any>;
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
    //this.ownedProjects = db.list(`registeredUsers/id/ownedProjects/${this.route.snapshot.params['name']}`);
    this.ownedProjects = this.afService.getOwnedProjects();
   /* this.ownedProjects.subscribe((p) => {
      this.myProj = this.afService.getProject(p);
      console.log(this.myProj);

    });
*/
    this.projectRequests = this.afService.getAllProjectRequests();
    this.projects = this.afService.getAllProjects();
    this.joinedProjects = this.afService.getJoinedProjects();

    this.myJoinProjects = db.list('registeredUsers/id/joinedProjects/' + this.route.snapshot.params['id']);
    /*--
    this.joinedProjects.subscribe((j) => {
      this.joinProj = j;
      console.log(this.joinProj);
    });*/
  }
  ngOnInit() {
    console.log('User is'+ this.afService.getUsers());
    this.joinedProjects = this.afService.joinedProjects;
    this.id = this.route.snapshot.params['id'];
    console.log('Params are' + this.id);
  }
}
