import {DashCommercantComponent} from './dash-commercant.component';
import {DashCommercantRoutes} from './dash-commercant.routing';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { ClientComponent } from './client/client.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashCommercantRoutes)
  ],
  declarations: [DashCommercantComponent, ClientComponent]
})
export class DashCommercantModule {}
