import { Component, OnInit } from '@angular/core';
import { AppComponent} from '../app.component';
import {AppRouting} from "../app.routing";
import {AF} from "../providers/af";
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/index";
import {GeocodingService} from "../services/geocoding.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user:FirebaseObjectObservable<any>

  constructor(private afService: AF ) {

  }


  ngOnInit() {
  this.user=this.afService.myProfile();
    console.log(this.afService.myProfile());
  }


}
