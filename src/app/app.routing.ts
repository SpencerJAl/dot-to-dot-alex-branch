/**
 * Created by davem on 13/02/2017.
 */
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProjectsComponent} from './projects/projects.component';

import {UsersProfilesComponent} from './users-profiles/users-profiles.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GoogleMapsComponent} from './maps/googlemaps.component';


import {AuthGuard} from './login/auth.guard';
import {CreateProjectComponent} from './createProject/createProject.component';
import {AccountSetupComponent} from './accountSetup/accountSetup.component';
import {MyProfileComponent} from './myProfile/myProfile.component';
import {AdminDashboardComponent} from './adminDashboard/adminDashboard.component';
import {CreateAdminComponent} from './createAdmin/createAdmin.component';
import {ProjectRequestComponent} from './projectRequest/projectRequest.component';
import {AdminComponent} from './admin/admin.component';
import {ProfileEditComponent} from './profileEdit/profileEdit.component';
import {MyProjectsComponent} from './myProjects/myProjects.component';
import {AccountStatusComponent} from './accountStatus/accountStatus.component';
import {ProjectSummaryComponent} from './project-summary/project-summary.component';
import {RecycledSupplierComponent} from './recycled-supplier/recycled-supplier.component';
import {SupplierRequestComponent} from './supplier-request/supplier-request.component';
import {WhatIsComponent} from './what-is/what-is.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {FaqComponent} from './faq/faq.component';
import {PartnersComponent} from './partners/partners.component';
import {UsefulLinksComponent} from './useful-links/useful-links.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {MyProjectComponent} from './my-project/my-project.component';
import {DonationsComponent} from './donations/donations.component';
import {FacebookPostsComponent} from "./facebook-posts/facebook-posts.component";
const appRoutes: Routes = [
  { path: '', component: HomeComponent,

  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Log In' }
  },
  {
    path: 'logout',
    component: LoginComponent,
    data: { title: 'logout' }
  },
  {
    path: 'accountStatus',
    component: AccountStatusComponent,
    data: { title: 'logout' }

  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Sign up' }
  },
  {
    path: 'accountSetup',
    component: AccountSetupComponent,
    data: { title: 'Setup account' },
    canActivate: [AuthGuard],

  },
  {
    path: 'myProjects',
    component: MyProjectsComponent,
    data: {title: 'My Projects'}
  },
  {
    path: 'myProject/:id',
    component: MyProjectComponent,
    data: {title: 'My Project'}
  },
  {
    path: 'projects/:id',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Projects' }
  },
  {
    path: 'createProject',
    component: CreateProjectComponent,
    canActivate: [AuthGuard],

    data: { title: 'CreateProject' }
  },
  {
    path: 'userProfile/:id',
    component: UsersProfilesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Profile' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,

    data: { title: 'Dashboard' }
  }
  ,
  {
    path: 'maps',
    component: GoogleMapsComponent,

    data: { title: 'Home' }
  },
  {
    path: 'myProfile',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
    data: { title: 'My profile' }
  },
  {
    path: 'editProfile',
    component: ProfileEditComponent,
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
  {
    path: 'supplier',
    component: RecycledSupplierComponent,
    data: {title: 'Recycling Supplier'}
  },
  {
    path: 'suppliers:/:id',
    component: RecycledSupplierComponent,
    data: {title: 'Recycling Supplier'}
  },
  {
    path: 'supplierRequest/:id',
    component: SupplierRequestComponent,
    data: {title: 'Supplier Request'}
  },
  {
    path: 'whatIs',
    component: WhatIsComponent,
    data: {title: 'What is Dot to Dot'}
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent,
    data: {title: 'What is Dot to Dot'}
  },
  {
    path: 'partners',
    component: PartnersComponent,
    data: {title: 'Partners'}
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: {title: 'FAQs'}
  },
  {
    path: 'usefulLink',
    component: UsefulLinksComponent,
    data: {title: 'Useful Links'}
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    data: {title: 'Useful Links'}
  },
  {
    path: 'donations/:id',
    component: DonationsComponent,
    data: {title: 'donations'}
  },
  {
    path: 'facebookPosts',
    component: FacebookPostsComponent,
    data: {title: 'Facebook Posts'}

  }


];



export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
