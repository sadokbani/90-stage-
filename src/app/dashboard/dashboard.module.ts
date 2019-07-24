import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {
  MatButtonModule, MatDialogModule, MatGridListModule, MatIconModule,
  MatListModule, MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSortModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';

import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import {UserAlert, UsersComponent} from './users/users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule,
  MatNativeDateModule,
 MatRadioModule, MatSelectModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { ClientComponent } from './users/client/client.component';
import { CommercantComponent } from './users/commercant/commercant.component';
import { ArchiveComponent } from './users/archive/archive.component';
import { CategorieComponent, alert_categorie } from './categorie/categorie.component';
import { CreateCategorieComponent } from './categorie/create-categorie/create-categorie.component';
import { UpdateCategorieComponent } from './categorie/update-categorie/update-categorie.component';
import {alert_sous_categorie, SouscategorieComponent} from './souscategorie/souscategorie.component';
import { CreateSouscategorieComponent } from './souscategorie/create-souscategorie/create-souscategorie.component';
import { UpdateSouscategorieComponent } from './souscategorie/update-souscategorie/update-souscategorie.component';
import {
  ArchiveCategorieComponent,
  alert_supp_categorie,
  alert_rest_categorie,
} from './categorie/archive-categorie/archive-categorie.component';
import {
  alert_rest_sous_categorie, alert_supp_sous_categorie,
  ArchiveSouscategorieComponent
} from './souscategorie/archive-souscategorie/archive-souscategorie.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule, MatGridListModule,
    MatSelectModule, MatToolbarModule,
    MatRadioModule,
    MatInputModule,
    PerfectScrollbarModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTabsModule, MatMenuModule,
    MatTooltipModule,
    MatExpansionModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatDialogModule,

    MatTabsModule, MatMenuModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [ alert_rest_sous_categorie, alert_supp_sous_categorie, alert_sous_categorie, alert_rest_categorie, alert_categorie, alert_supp_categorie , alert_categorie, UserAlert, DashboardComponent, ArchiveSouscategorieComponent, UsersComponent, ArchiveCategorieComponent, ClientComponent, CommercantComponent, ArchiveComponent, CategorieComponent,
    CreateCategorieComponent, UpdateCategorieComponent, SouscategorieComponent, CreateSouscategorieComponent,
    UpdateSouscategorieComponent],
  entryComponents: [alert_rest_sous_categorie, alert_supp_sous_categorie, alert_sous_categorie, alert_rest_categorie, UserAlert, alert_categorie, alert_supp_categorie],


})
export class DashboardModule {}
