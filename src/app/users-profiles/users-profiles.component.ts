import { Component, OnInit } from '@angular/core';
import { AppComponent} from '../app.component';
import {AppRouting} from '../app.routing';
import {UserService} from '../services/localUser.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FirebaseObjectObservable} from 'angularfire2/database';
import {User} from '../providers/user';
import {AF} from '../providers/af';

@Component({
  selector: 'app-users-profiles',
  templateUrl: './users-profiles.component.html',
  styleUrls: ['./users-profiles.component.scss']
})
export class UsersProfilesComponent implements OnInit {
  user: FirebaseObjectObservable<User>;
  constructor(private _userService: UserService, private route: ActivatedRoute, private afService: AF ) {
    this.user = afService.getUser(this.route.snapshot.params['id']);
  }

  ngOnInit() {
  }

}

interface people {
  name: string;
  age: number;
  summary: string;
  description: string;
  hobbies: [ {name: string } ];

}
