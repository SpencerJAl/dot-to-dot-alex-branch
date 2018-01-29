import { Component, OnInit } from '@angular/core';
import { AppComponent} from '../app.component';
import {AppRouting} from "../app.routing";
import {AF} from "../providers/af";
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {GeocodingService} from "../services/geocoding.service";
import {User} from  '../providers/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user:FirebaseObjectObservable<User>;
  name:string;

  constructor(private afService: AF ) {

  }


  ngOnInit() {
  this.user=this.afService.myProfile();
    console.log(this.afService.myProfile());
  }


}
