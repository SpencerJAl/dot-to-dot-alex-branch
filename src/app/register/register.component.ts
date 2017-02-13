import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { AppComponent} from '../app.component';
import {AppRouting} from "../app.routing";
import {EmailPasswordCredentials} from "angularfire2/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Register for DOT-to-DOT';
  isAuth = false;
  authColor = 'warn';
  user = { email: '',
    password: ''};
/*
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );

  };



  signupUser(newEmail: string, newPassword: string):any {
      return this.af.auth.createUser(  { email: newEmail , password: newPassword});
  }

  private _changeState(user: any = null) {
    if(user) {
      this.isAuth = true;
      this.authColor = 'primary';
      this.user = this._getUserInfo(user)
    }
    else {
      this.isAuth = false;
      this.authColor = 'warn';
      this.user = {};
    }
  }
  private _getUserInfo(user: any): any {
    if(!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId
    };
  }
 */
  ngOnInit() {
  }

}
