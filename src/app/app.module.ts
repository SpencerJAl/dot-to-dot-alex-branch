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
import { AgmCoreModule , SebmGoogleMap, SebmGoogleMapMarker  } from 'angular2-google-maps/core';
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { UsersProfilesComponent } from './users-profiles/users-profiles.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {GoogleMapsComponent} from './maps/googlemaps.component';
import {CoreModule} from './app.core.modules';
import {AlertService} from'./services/alert.service';
import { Ng2MapModule} from 'ng2-map';

// MATERIAL DESIGN MODULES
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from "./login/auth.guard";
import {MapsService} from "./services/maps.service";
import {GeolocationService} from "./services/geolocation.service";
import {GeocodingService} from "./services/geocoding.service";
import {AF} from "./providers/af";
import {CreateProjectComponent} from "./createProject/createProject.component";
import {AccountSetupComponent} from "./accountSetup/accountSetup.component";
import {ProjectService} from "./services/localProject.service";
import {UserService} from "./services/localUser.service";
import {GetProjects} from "./localStorage/projects";
import {MyProfileComponent} from "./myProfile/myProfile.component";
import {CreateAdminComponent} from "./createAdmin/createAdmin.component";
import {AdminDashboardComponent} from "./adminDashboard/adminDashboard.component";
import {ProjectRequestComponent} from "./projectRequest/projectRequest.component";
import {AdminComponent} from "./admin/admin.component";
import {ProfileEditComponent} from "./profileEdit/profileEdit.component";
import {MyProjectsComponent} from "./myProjects/myProjects.component";
//import {GMapModule} from 'primeng/primeng';

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

 */
export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}


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
    DashboardComponent,
    GoogleMapsComponent,
    CreateProjectComponent,
    AccountSetupComponent,
    MyProfileComponent,
    CreateAdminComponent,
    AdminDashboardComponent,
    ProjectRequestComponent,
    AdminComponent,
    ProfileEditComponent,
    MyProjectsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    //GMapModule,
    AppRouting,
    Ng2MapModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJioRbIuJMQr14RqtvlIA587lm-HMHFD0' //google maps api key

    }),//google maps

    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyBN2oxnV4Seen_IxxrNzPeTMZOH1eWb2oc",
        authDomain: "project--1058925460034076790.firebaseapp.com",
        databaseURL: "https://project--1058925460034076790.firebaseio.com",
        storageBucket: "project--1058925460034076790.appspot.com"
        //messagingSenderId: "779470844821"
      },
      {
        //method: AuthMethods.Popup,
        method: AuthMethods.Redirect,
        //provider: AuthProvide,
        //method: AuthMethods.Password
      }
    ),
    ...MD_MODULES
    /*,
    AngularFireModule.initializeApp(CoreModule.firebaseConfig),
    */
  ],
  providers: [
    FIREBASE_PROVIDERS,
    AF,
    AngularFire,
    AuthGuard,
    MapsService,
    GeolocationService,
    GeocodingService,
    ProjectService,
    UserService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
