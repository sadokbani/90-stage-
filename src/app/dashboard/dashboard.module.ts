import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

import {
  MatButtonModule, MatChip, MatDialogModule, MatGridListModule, MatIconModule,
  MatListModule, MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSortModule, MatStepperModule, MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatChipsModule} from '@angular/material';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { UsersComponent} from './users/users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule,
  MatNativeDateModule,
 MatRadioModule, MatSelectModule, MatSnackBar
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ClientComponent, } from './users/client/client.component';
import { CommercantComponent } from './users/commercant/commercant.component';
import {ArchiveComponent, } from './users/archive/archive.component';
import { CategorieComponent, } from './categorie/categorie.component';

import {


  CreateCategorieComponent
} from './categorie/create-categorie/create-categorie.component';
// import {CountryPickerModule, } from 'ngx-country-picker';
import { UpdateCategorieComponent } from './categorie/update-categorie/update-categorie.component';
import { SouscategorieComponent} from './souscategorie/souscategorie.component';
import { CreateSouscategorieComponent , } from './souscategorie/create-souscategorie/create-souscategorie.component';
import { UpdateSouscategorieComponent } from './souscategorie/update-souscategorie/update-souscategorie.component';
import {
  ArchiveCategorieComponent,

} from './categorie/archive-categorie/archive-categorie.component';
import {

  ArchiveSouscategorieComponent
} from './souscategorie/archive-souscategorie/archive-souscategorie.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HistoriqueAchatsComponent } from './historique-achats/historique-achats.component';
import { PaysComponent } from './pays/pays.component';
import { CreatePaysComponent } from './pays/create-pays/create-pays.component';
import { ArchivePaysComponent } from './pays/archive-pays/archive-pays.component';
import { UpdatePaysComponent } from './pays/update-pays/update-pays.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { CommentaireDesacComponent } from './commentaire/commentaire-desac/commentaire-desac.component';
import { AjoutCommentaireComponent } from './commentaire/ajout-commentaire/ajout-commentaire.component';
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
    MatChipsModule,
    MatStepperModule,
    // CountryPickerModule.forRoot(),


    MatTabsModule, MatMenuModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [ DashboardComponent, ArchiveSouscategorieComponent, UsersComponent, ArchiveCategorieComponent, ClientComponent, CommercantComponent, ArchiveComponent, CategorieComponent,
    CreateCategorieComponent, UpdateCategorieComponent, SouscategorieComponent, HistoriqueAchatsComponent, CreateSouscategorieComponent,
    UpdateSouscategorieComponent,
    HistoriqueAchatsComponent,
    PaysComponent,
    CreatePaysComponent,
    ArchivePaysComponent,
    UpdatePaysComponent,
    CommentaireComponent,
    CommentaireDesacComponent,
    AjoutCommentaireComponent],
  entryComponents: [AjoutCommentaireComponent],


})
export class DashboardModule {}
