import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { AppComponent} from '../app.component';
import {AppRouting} from "../app.routing";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})




export class LoginComponent implements OnInit {
  title = 'Log in';
  isAuth = false;
  authColor = 'warn';
  user = {};

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );

  };

  resetPassword(email: string): any {
    firebase.auth().sendPasswordResetEmail(email);
  }

  loginUser(newEmail: string, newPassword: string) {
     this.af.auth.login({ email: newEmail, password: newPassword },
          {
      provider: AuthProviders.Password, method: AuthMethods.Password
    });

  }

  login(from: string) {
    this.af.auth.login({

        provider: this._getProvider(from)


    });
  }
  logout() {
    this.af.auth.logout();
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

  private _getProvider(from: string) {
    switch(from){
      case 'twitter': return AuthProviders.Twitter;
      case 'facebook': return AuthProviders.Facebook;
      case 'google': return AuthProviders.Google;


    }
  }

  ngOnInit() {


  }
}
