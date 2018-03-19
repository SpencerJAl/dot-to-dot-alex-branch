import { Component, OnInit } from '@angular/core';
import {AF} from '../providers/af';
import {DonationsService} from '../services/donations.service';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {ActivatedRoute, Router} from '@angular/router';
import {SuppliersService} from '../suppliers.service';

@Component({
  selector: 'app-my-supply',
  templateUrl: './my-supply.component.html',
  styleUrls: ['./my-supply.component.scss']
})
export class MySupplyComponent implements OnInit {
  error: any;
  project: FirebaseObjectObservable<any>;
  id: string;
  isMember: boolean;
  projects: FirebaseListObservable<any>;
  projectData: {};
  notifications: FirebaseListObservable<any>;
  donations: FirebaseListObservable<any>;
  userID;


  constructor(private afService: AF, private router: Router, private afAuth: AngularFireModule,
              private db: AngularFireDatabase, private route: ActivatedRoute, private donationsService: SuppliersService ) {
    this.project = db.object('suppliers/' + this.route.snapshot.params['id']);
    this.donations = db.list('suppliers/' + this.route.snapshot.params['id'] + '/collectors');
    this.notifications = db.list('suppliers/' + this.route.snapshot.params['id'] + '/notifications');
    this.project.subscribe((p) => {
      this.projectData = p;
      this.id = p.id;

    });
    this.userID = afService.userID;
    //  alert(this.route.snapshot.params['id']);
  }

  join() {
    this.afService.join(this.route.snapshot.params['id']).then(() => {
      this.router.navigate(['/']);
    }).catch((error) => {
      this.error = error;
      console.log(this.error);
    });
  }

  postUpdate($event, title, message) {
    this.afService.postProjectNotification(message, this.afService.avatar, this.route.snapshot.params['id'], title );
    console.log('Message Sent');
  }

  ngOnInit() {
  }

  acceptDonation(amount , id, i) {
    this.donationsService.setDonation(amount , this.id, id, i);
    this.donationsService.acceptDonation();
  }

  declineDonation() {
  }
}
