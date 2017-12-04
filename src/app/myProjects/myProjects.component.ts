
/**
 * Created by James on 11/07/2017.
 * Edited by Alexander on 27/07/2017
 */
import {OnInit, Component} from '@angular/core';
import {AF} from '../providers/af';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {Router, ActivatedRoute} from '@angular/router';
import {register} from 'ts-node/dist';
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
  user: FirebaseListObservable<any>;
  /*Tells af.ts which public exports are needed */
  myProj;
  joinProj;


  constructor(private afService: AF, private afAuth: AngularFireAuth, private db: AngularFireDatabase,
              private router: Router, private route: ActivatedRoute) { /*searchs the database for information */
    this.user = db.list('registeredUsers/');
    /* this.ownedProjects = db.database.list('registeredUsers/joinedProjects/');*/
    this.ownedProjects = db.list(`registeredUsers/id/ownedProjects/${this.route.snapshot.params['name']}`);
    this.ownedProjects.subscribe((p) => {
      this.myProj = p;

    });
    this.joinedProjects = db.list('registeredUsers/id/joinedProjects/' + this.route.snapshot.params['id']);
    this.joinedProjects.subscribe((j) => {
      this.joinProj = j;
    });
  }
  ngOnInit() {
    console.log(this.afService.getUsers());
    this.id = this.route.snapshot.params['id'];
    console.log('Params are' + this.id);
  }
}
