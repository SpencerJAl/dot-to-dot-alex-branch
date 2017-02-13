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
const appRoutes: Routes = [
  { path: '', component: HomeComponent

  },
  {
    path:'login',
    component: LoginComponent,
    data: { title: 'Log In' }
  },
  {
    path:'register',
    component: RegisterComponent,
    data: { title: 'Sign up' }
  },
  {
    path:'projects',
    component: ProjectsComponent,
    data: { title: 'Projects' }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {title: 'Users'}
  },
  {
    path:'users-profiles',
    component:UsersProfilesComponent,
    data: { title: 'Profile' }
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    data: { title: 'dashboard' }
  }


];



export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
