///<reference path="../../node_modules/angularfire2/auth/auth.d.ts"/>
import { Component, } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable ,FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {LoginComponent} from './login/login.component';
import {AppRouting} from './app.routing';
import {AF} from "./providers/af";
import {Router} from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  usertype;
  isadmin=false;

  public  isLoggedIn: boolean;

  constructor(private afService: AF, private router: Router) {
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.
    this.afService.afAuth.authState.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");

          this.isLoggedIn = false;
          this.router.navigate(['']);
        }
        else
        {
          console.log("Successfully Logged in.");

          afService.user.subscribe((u)=>{
            if(u.type=="admin"){
             this.isadmin=true;
            }
          });

          this.user=afService.user;
          afService.user.subscribe((u)=>{this.usertype=u.type})
          // Set the Display Name and Email so we can attribute messages to them
          /*
          if(authogle)
          {
            this.afService.displayName = auth.google.displayName;
            this.afService.email = auth.google.email;
            // this.user = this._getUserInfo(auth.google);
          }
          else if (auth.facebook) {
            this.afService.displayName = auth.facebook.displayName;
            this.afService.email = auth.facebook.email;
            //this.user = this._getUserInfo(auth.facebook);

          }
          else if (auth.twitter) {
            this.afService.displayName = auth.twitter.displayName;
            this.afService.email = auth.twitter.email;
            // this.user = this._getUserInfo(auth.twitter);

          }
          else
          {
            this.afService.displayName = auth.auth.email;
            this.afService.email = auth.auth.email;
            //this.user = this._getUserInfo(auth.auth);

          }*/
          this.afService.displayName =auth.displayName;

          this.isLoggedIn = true;
          this.router.navigate(['']);



        }




      }
    );
  }

  logout() {
    this.afService.logout();
  }

 /* constructor(
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
  }*/



}
