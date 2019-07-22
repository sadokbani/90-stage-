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
import { UsersComponent } from './users/users.component';
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
import { CategorieComponent } from './categorie/categorie.component';
import { CreateCategorieComponent } from './categorie/create-categorie/create-categorie.component';
import { UpdateCategorieComponent } from './categorie/update-categorie/update-categorie.component';
import { SouscategorieComponent } from './souscategorie/souscategorie.component';
import { CreateSouscategorieComponent } from './souscategorie/create-souscategorie/create-souscategorie.component';
import { UpdateSouscategorieComponent } from './souscategorie/update-souscategorie/update-souscategorie.component';

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
    MatDatepickerModule,MatGridListModule,
    MatSelectModule,MatToolbarModule,
    MatRadioModule,
    MatInputModule,
    PerfectScrollbarModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatTabsModule,MatMenuModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [DashboardComponent, UsersComponent, ClientComponent, CommercantComponent, ArchiveComponent, CategorieComponent, CreateCategorieComponent, UpdateCategorieComponent, SouscategorieComponent, CreateSouscategorieComponent, UpdateSouscategorieComponent]
})
export class DashboardModule {}
