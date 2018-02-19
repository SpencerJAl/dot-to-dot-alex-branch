import {Component, OnInit} from '@angular/core';
import {FirebaseListObservable, AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import {AF} from '../providers/af';
import{Project }from '../providers/project';
import {User} from '../providers/user';
import {Supplier} from '../providers/supplier';
/**
 * Created by James on 05/06/2017.
 */
@Component({
  selector: 'app-adminDashboard',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  searchText:string;
  users: FirebaseListObservable<User[]>;
  projectRequests: FirebaseListObservable<Project[]>;
  supplierRequests: FirebaseListObservable<Supplier[]>;
  ngOnInit() {
    console.log(this.afService.getUsers());
  }
  constructor(private afService: AF, private router: Router, private af: AngularFireDatabase) {
    this.users = af.list('registeredUsers/');
    this.projectRequests = af.list('projectRequests/');
    console.log(this.projectRequests);
    this.supplierRequests = af.list('supplierRequests/');
  }
  remove(id) {
    console.log('remove works');
    this.af.object('registeredUsers/' + id).set({
      status: 'deleted'
    });
  }

  archive(id) {
    console.log('archive works');
    console.log('id is ' + id);
    this.af.object('registeredUsers/' + id).update({
      status: 'archived'
    });
  }

  promote(id) {
    this.af.object('registeredUsers/' + id).update({
      type: 'admin'
    });
  }
}
