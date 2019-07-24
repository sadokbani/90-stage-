import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import {AuthGaurdService} from './auth-gaurd.service';

export const AppRoutes: Routes = [
  {
  path: '',
  component: AdminLayoutComponent,
    canActivate:[AuthGaurdService],
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
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
  {
  path: '**',
  redirectTo: 'session/404'
},



];
