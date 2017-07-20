import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule} from 'angularfire2/auth';

import {FirebaseListObservable, AngularFireDatabase} from "angularfire2/database";
import { AppComponent} from '../app.component';
import {AppRouting} from "../app.routing";
import {Router} from "@angular/router";
import {AF} from "../providers/af";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})




export class LoginComponent implements OnInit{
  public error: any;
  user ={};
  isAuth: boolean;
  userType:string;
  userStatus:string;
  ngOnInit() {
    this.isAuth= this.afService.isAuth();
  }

  constructor(private afService: AF, private router: Router) {

  }

  /**
   * calls the service to log the user into the system via there dotToDot Account
   * @param event
   * @param email
   * @param password
     */
  loginWithEmail(event, email, password){
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then((success) => {

      console.log("display name is"+ success.auth.displayName);



      this.afService.user.subscribe((u)=>{
        this.userType=u.type;
        this.userStatus=u.status;
        if(u.status=='archived'){

          this.router.navigate(['/userStatus']);
          this.afService.logout();
        }
        if(u.type=="admin"){
          console.log("user is " + this.userType );
          this.router.navigate(['/adminDashboard']);
        }
        else if (u.type=="user") {
          this.router.navigate(['/dashboard']);
          console.log("user is " + this.userType );
        }
      })





    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }

  /**
   * calls the angularfire request to log the user into the system using a google account
   */
  loginWithGoogle() {
    this.afService.loginWithGoogle().then((data) => {
      // Send them to the homepage if they are logged in

      console.log(data);
      this.user = this._getUserInfo(data);
      this.afService.addUserInfo();

      this.afService.user.subscribe((u)=>{
        this.userType=u.type;
        this.userStatus=u.status;
        if(u.status=='archived'){

          this.router.navigate(['/userStatus']);
          this.afService.logout();
        }
        if(u.type=="admin"){
          console.log("user is " + this.userType );
          this.router.navigate(['/adminDashboard']);
        }
        else if (u.type=="user") {
          this.router.navigate(['/dashboard']);
          console.log("user is " + this.userType );
        }
      })

    })
  }

  /**
   * calls the angularfire request to log the user into the system using a twitter account
   */
  loginWithTwitter(){
    this.afService.loginWithTwitter().then((data) => {
      // Send them to the homepage if they are logged in
      console.log(data);
      this.user = this._getUserInfo(data);
      this.afService.addUserInfo();
      this.afService.user.subscribe((u)=>{
        this.userType=u.type;
        this.userStatus=u.status;
        if(u.status=='archived'){

          this.router.navigate(['/userStatus']);
          this.afService.logout();
        }
        if(u.type=="admin"){
          console.log("user is " + this.userType );
          this.router.navigate(['/adminDashboard']);
        }
        else if (u.type=="user") {
          this.router.navigate(['/dashboard']);
          console.log("user is " + this.userType );
        }
      })
    })
  }

  /**
   * calls the angularefire request to log the user into the system using a facebook account
   */
  loginWithFacebook(){
    this.afService.loginWithFacebook().then((data) => {
      // Send them to the homepage if they are logged in
      console.log(data);
      this.user = this._getUserInfo(data);
      this.afService.addUserInfo();
      this.afService.user.subscribe((u)=>{
        this.userType=u.type;
        this.userStatus=u.status;
        if(u.status=='archived'){

          this.router.navigate(['/userStatus']);
          this.afService.logout();
        }
        if(u.type=="admin"){
          console.log("user is " + this.userType );
          this.router.navigate(['/adminDashboard']);
        }
        else if (u.type=="user") {
          this.router.navigate(['/dashboard']);
          console.log("user is " + this.userType );
        }
      })
    })
  }

  /**
   * logs the user out of the system
   */
  logout() {
    this.afService.logout();
    this.isAuth=false;
  }

  /**
   * adds user information to the database
   * @param user
   * @returns {any}
   * @private
     */
  private _getUserInfo(user: any): any {
    if(!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    return {
      name: data.name,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId
    };
  }

  /*constructor(public af: AngularFire) {
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
      localStorage.setItem('currentUser', JSON.stringify(this.user));
    }
    else {
      this.isAuth = false;
      this.authColor = 'warn';
      this.user = {};
      localStorage.removeItem('currentUser');
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
  */
}
