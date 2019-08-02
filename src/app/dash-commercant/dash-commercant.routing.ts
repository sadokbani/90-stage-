import { Routes } from '@angular/router';
import {DashCommercantComponent} from './dash-commercant.component';
import {ClientComponent} from './client/client.component';

export const DashCommercantRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'accueil',
        component: DashCommercantComponent
      },
      {
        path: 'client',
        component: ClientComponent
      },

    ]
  }
];
