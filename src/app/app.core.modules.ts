/**
 * Created by davem on 13/02/2017.
 */
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AngularFireModule

} from "angularfire2";
import { AngularFireDatabase, FirebaseListObservable ,FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyBNHhjucR3zi7snRmJOC1w9OQLTyUnKec8",
  authDomain: "steampunks-158812.firebaseapp.com",
  databaseURL: "https://steampunks-158812.firebaseio.com",
  storageBucket: "steampunks-158812.appspot.com",
  messagingSenderId: "326075310807"
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  exports: [
    BrowserModule,
  ]
})
export class CoreModule {}
