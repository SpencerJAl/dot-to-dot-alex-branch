///<reference path="../../node_modules/angularfire2/auth/auth.d.ts"/>
import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {LoginComponent} from './login/login.component';
import {AppRouting} from './app.routing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'DOT-to-DOT';
  isAuth = false;
  authColor = 'warn';
  user = {};

  constructor(
    public af: AngularFire
  ) {
    this.af.auth.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );
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

}
