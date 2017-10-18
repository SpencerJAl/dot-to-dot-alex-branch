import { Component, OnInit } from '@angular/core';
import { AppComponent} from '../app.component';
import {AppRouting} from "../app.routing";
import {UserService} from "../services/localUser.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-users-profiles',
  templateUrl: './users-profiles.component.html',
  styleUrls: ['./users-profiles.component.scss']
})
export class UsersProfilesComponent implements OnInit {
  id:string;
  peoples: people[]=[];
  sub;
  person:people;
  constructor(private _userService: UserService, private route: ActivatedRoute ){
    this.peoples=this._userService.getUsers();
    for(var i=0; i<this.peoples.length; i++){
      console.log("person is " + this.peoples[i].name);
      console.log("id is"+this.route.snapshot.params['id']);
      if(this.peoples[i].name===this.route.snapshot.params['id']){
        console.log("person found");
        this.person=this.peoples[i];
        console.log("person desc is"+ this.person.description);
        console.log ("person is"+this.person.name);
      }
    }
  }

  ngOnInit() {
    this.id= this.route.snapshot.params['id'];
  }

}

interface people{
  name:string;
  age:number;
  summary:string;
  description:string;
  hobbies:[{name:string}];

}
