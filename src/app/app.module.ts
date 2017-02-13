import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule,
  FIREBASE_PROVIDERS,
  AngularFire,
  AuthMethods,
  AuthProviders
} from 'angularfire2';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { UsersProfilesComponent } from './users-profiles/users-profiles.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {CoreModule} from './app.core.modules';

// MATERIAL DESIGN MODULES
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { DashboardComponent } from './dashboard/dashboard.component';

export let MD_MODULES: any = [
  MdToolbarModule,
  MdButtonModule,
  MdCardModule
];

/*
export const firebaseConfig = {
  apiKey: "AIzaSyBN2oxnV4Seen_IxxrNzPeTMZOH1eWb2oc",
  authDomain: "project--1058925460034076790.firebaseapp.com",
  databaseURL: "https://project--1058925460034076790.firebaseio.com",
  storageBucket: "project--1058925460034076790.appspot.com",
  messagingSenderId: "779470844821"
}

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}
*/

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SafeUrlPipe,
    ProjectsComponent,
    UsersComponent,
    UsersProfilesComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    AppRouting,
    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyBN2oxnV4Seen_IxxrNzPeTMZOH1eWb2oc",
        authDomain: "project--1058925460034076790.firebaseapp.com",
        databaseURL: "https://project--1058925460034076790.firebaseio.com",
        storageBucket: "project--1058925460034076790.appspot.com",
        messagingSenderId: "779470844821"
      },
      {
        //method: AuthMethods.Popup,
        method: AuthMethods.Redirect
      }
    ),
    ...MD_MODULES
    /*,
    AngularFireModule.initializeApp(CoreModule.firebaseConfig),
    */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
