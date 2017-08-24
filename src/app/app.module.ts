import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

///****************** FIREBASE **********************************//
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
/*import {  FIREBASE_PROVIDERS, AngularFireModule
  AngularFire,
  AuthMethods,
  AuthProviders} from 'angularfire2/';*/



import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule , AgmMap, AgmMarker   } from '@agm/core';
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { UsersProfilesComponent } from './users-profiles/users-profiles.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import {GoogleMapsComponent} from './maps/googlemaps.component';
import {CoreModule} from './app.core.modules';
import {AlertService} from'./services/alert.service';
import { Ng2MapModule} from 'ng2-map';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import 'hammerjs';
// MATERIAL DESIGN MODULES
// import { MdToolbarModule  } from '@angular2-material/toolbar';
// import { MdButtonModule } from '@angular2-material/button';
//  import { MdCardModule } from '@angular2-material/card';
import {MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,} from '@angular/material';

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
import {AccountStatusComponent} from "./accountStatus/accountStatus.component";
import { MenuComponent } from './menu/menu.component';
import {GoogleMapsComponent} from "./maps/googlemaps.component";
import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectFilterComponent } from './project-filter/project-filter.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { ProjectSummaryComponent} from './project-summary/project-summary.component';
import {RecycledSupplierComponent} from "./recycled-supplier/recycled-supplier.component"
import {GMapModule, ChartModule } from 'primeng/primeng';
import { MyCompComponent } from './my-comp/my-comp.component';
import { ScienceFilterPipe } from './map/science-filter.pipe';


export let MD_MODULES: any = [
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
];

/*  LIVE */
/*
export const firebaseConfig = {
  apiKey: "AIzaSyBN2oxnV4Seen_IxxrNzPeTMZOH1eWb2oc",
  authDomain: "project--1058925460034076790.firebaseapp.com",
  databaseURL: "https://project--1058925460034076790.firebaseio.com",
  storageBucket: "project--1058925460034076790.appspot.com",
  messagingSenderId: "779470844821"
}
 */

/////   DEV

export const firebaseConfig = {
  apiKey: "AIzaSyBw-rY-khKozG8qeSqdO7iO6fdyc5bt5Qo",
  authDomain: "project--5383574466381407389.firebaseapp.com",
  databaseURL: "https://project--5383574466381407389.firebaseio.com",
  projectId: "project--5383574466381407389",
  storageBucket: "project--5383574466381407389.appspot.com",
  messagingSenderId: "627281333849"
}

/*
export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method:  AuthMethods.Password
}

*/

//  GoogleMapsComponent,
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
    MyProjectsComponent,
    AccountStatusComponent,
    MenuComponent,
    NotificationsComponent,
    ProjectFilterComponent,
    FooterComponent,
    SearchComponent,
    ProjectSummaryComponent,
    RecycledSupplierComponent,
    MyCompComponent,
    ScienceFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    //GMapModule,
    ChartModule,
    AppRouting,
    Ng2MapModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJioRbIuJMQr14RqtvlIA587lm-HMHFD0' //google maps api key

    }),//google maps
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
   /* AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyBN2oxnV4Seen_IxxrNzPeTMZOH1eWb2oc",
        authDomain: "project--1058925460034076790.firebaseapp.com",
        databaseURL: "https://project--1058925460034076790.firebaseio.com",
        storageBucket: "project--1058925460034076790.appspot.com"
        //messagingSenderId: "779470844821"
      }*/

    ...MD_MODULES
    /*,
    AngularFireModule.initializeApp(CoreModule.firebaseConfig),
    */
  ],
  providers: [
    //FIREBASE_PROVIDERS,
    AF,
    //AngularFire,
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
