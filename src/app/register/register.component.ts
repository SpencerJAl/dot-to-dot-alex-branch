import { Component, OnInit } from '@angular/core';
import {AF} from "../providers/af";
import {Router} from "@angular/router";
import {AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import{ AngularFireDatabase} from 'angularfire2/database';
import { AppComponent} from '../app.component';
import {AppRouting} from "../app.routing";
//import { EmailPasswordCredentials } from "angularfire2/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Register for DOT-to-DOT';
  isAuth = false;
  authColor = 'warn';
  public error: any;

  constructor(private afService: AF, private router: Router) { }

  register(event, name, email, password) {
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email).then(() => {
        this.router.navigate(['/accountSetup']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
  }

  /*
  dbPostData(fullname, email, password){
    firebase.database().ref('/').push(this.user);

  }
  //the stuff above this was initially not commented out

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
