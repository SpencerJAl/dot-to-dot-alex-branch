/**
 * Created by davem on 13/02/2017.
 */
import { NgModule }              from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProjectsComponent} from './projects/projects.component';
import {UsersComponent} from './users/users.component';
import {UsersProfilesComponent} from './users-profiles/users-profiles.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GoogleMapsComponent} from'./maps/googlemaps.component';


import {AuthGuard} from './login/auth.guard';
import {CreateProjectComponent} from "./createProject/createProject.component";
import {AccountSetupComponent} from "./accountSetup/accountSetup.component";
import {MyProfileComponent} from "./myProfile/myProfile.component";
import {AdminDashboardComponent} from "./adminDashboard/adminDashboard.component";
import {CreateAdminComponent} from "./createAdmin/createAdmin.component";
import {ProjectRequestComponent} from "./projectRequest/projectRequest.component";
import {AdminComponent} from "./admin/admin.component";
import {ProfileEditComponent} from "./profileEdit/profileEdit.component";
import {MyProjectsComponent} from "./myProjects/myProjects.component";
import {AccountStatusComponent} from "./accountStatus/accountStatus.component";
import {ProjectSummaryComponent} from "./project-summary/project-summary.component";

const appRoutes: Routes = [
  { path: '', component:HomeComponent,

  },
  {
    path:'login',
    component: LoginComponent,
    data: { title: 'Log In' }
  },
  {
    path:'logout',
    component:LoginComponent,
    data: { title: 'logout' }
  },
  {
    path: 'accountStatus',
    component: AccountStatusComponent,
    data: { title: 'logout' }

  },
  {
    path:'register',
    component: RegisterComponent,
    data: { title: 'Sign up' }
  },
  {
    path:'accountSetup',
    component: AccountSetupComponent,
    data: { title: 'Setup account' },
    canActivate: [AuthGuard],

  },
  {
    path:'myProjects',
    component:MyProjectsComponent,
    data: {title: 'My Projects'}
  },
  {
    path:'projects/:id',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Projects' }
  },
  {
    path:'createProject',
    component: CreateProjectComponent,
    canActivate: [AuthGuard],

    data: { title: 'CreateProject' }
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: {title: 'Users'}
  },
  {
    path:'userProfile/:id',
    component:UsersProfilesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Profile' }
  },
  {
    path:'dashboard',
    component:DashboardComponent,

    data: { title: 'Dashboard' }
  }
  ,
  {
    path:'maps',
    component:GoogleMapsComponent,

    data: { title: 'Home' }
  },
  {
    path:'myProfile',
    component:MyProfileComponent,
    canActivate: [AuthGuard],
    data: { title: 'My profile' }
  },
  {
    path:'editProfile',
    component:ProfileEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'My profile' }
  },
      {
        path: 'adminDashboard',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: {title: 'My profile'}
      },
      {
        path: 'createAdmin',
        component: CreateAdminComponent,
        data: {title: 'Create admin'}
      },
      {
        path: 'projectRequest/:id',
        component: ProjectRequestComponent,
        data: {title: 'Project Request'}
      },

  {
    path: 'projectsummary',
    component: ProjectSummaryComponent,
    data: {title: 'Project Summary'}
  },



];



export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
