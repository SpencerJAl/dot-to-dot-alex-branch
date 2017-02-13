/**
 * Created by davem on 13/02/2017.
 */
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AngularFireModule,
  AuthMethods,
  AuthProviders
} from "angularfire2";

const firebaseConfig = {
  apiKey: "AIzaSyBN2oxnV4Seen_IxxrNzPeTMZOH1eWb2oc",
  authDomain: "project--1058925460034076790.firebaseapp.com",
  databaseURL: "https://project--1058925460034076790.firebaseio.com",
  storageBucket: "project--1058925460034076790.appspot.com",
  messagingSenderId: "779470844821"
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  ],
  exports: [
    BrowserModule,
  ]
})
export class CoreModule {}
