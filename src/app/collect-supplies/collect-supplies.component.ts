import { Component, OnInit } from '@angular/core';
import {AF} from '../providers/af';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-collect-supplies',
  templateUrl: './collect-supplies.component.html',
  styleUrls: ['./collect-supplies.component.scss']
})
export class CollectSuppliesComponent implements OnInit {

  project: FirebaseObjectObservable<any>;
  constructor(private afService: AF, private afAuth: AngularFireAuth, private db: AngularFireDatabase,
              private router: Router, private route: ActivatedRoute) {
    this.project = db.object('suppliers/' + this.route.snapshot.params['id']);

  }
  donateItem($event, amount, details, key) {
    this.db.list('suppliers/' + this.route.snapshot.params['id'] + '/collectors').push({
      itemID: key,
      amount: amount,
      details: details,
      accepted: false,
      user: this.afService.userID
    }).then((e) => {
      this.db.object('suppliers/' + this.route.snapshot.params['id'] + '/collectors/' + e.key).update({id: e.key});
    });
  }
  ngOnInit() {
  }


}
