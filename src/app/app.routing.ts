import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import {AuthGaurdService} from './auth-gaurd.service';
import {CommercantLayoutComponent} from './core/commercant-layout/commercant-layout.component';
import {AuthGardComService} from './auth-gard-com.service';

export const AppRoutes: Routes = [
  {
  path: '',
  component: AdminLayoutComponent,
    canActivate:[AuthGaurdService],
  children: [{
    path: 'admin',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }]
},
{
  path: '',
  component: CommercantLayoutComponent,
  canActivate:[AuthGardComService],
  children: [{
    path: 'commer',
    loadChildren: './dash-commercant/dash-commercant.module#DashCommercantModule'
  }]
},

  {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
},
//   {
//   path: '**',
//   redirectTo: 'session/404'
// },



];
