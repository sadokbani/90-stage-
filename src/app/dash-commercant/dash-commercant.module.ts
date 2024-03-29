import {DashCommercantComponent} from './dash-commercant.component';
import {DashCommercantRoutes} from './dash-commercant.routing';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {
  MatButtonModule, MatChip, MatDialogModule, MatGridListModule, MatIconModule,
  MatListModule, MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSortModule, MatStepperModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule,
} from '@angular/material';

import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatChipsModule} from '@angular/material';
import { ClientComponent } from './client/client.component';
import { HistoriqueComponent } from './historique/historique.component';
import { PromotionComponent } from './promotion/promotion.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule,
  MatNativeDateModule,
  MatRadioModule, MatSelectModule, MatSnackBar
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { ArchiveClientsComponent } from './client/archive-clients/archive-clients.component';
import { CreatePromotionComponent } from './promotion/create-promotion/create-promotion.component';
import { PointsVenteComponent } from './promotion/points-vente/points-vente.component';
import { CreatePtvComponent } from './promotion/points-vente/create-ptv/create-ptv.component';
import { UpdatePtvComponent } from './promotion/points-vente/update-ptv/update-ptv.component';
import { ArchivePtvComponent } from './promotion/points-vente/archive-ptv/archive-ptv.component';
import {PromoptionImage} from './promotion/promotion.component';
import {AjoutCommentaireComponent} from '../dashboard/commentaire/ajout-commentaire/ajout-commentaire.component';


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
    MatTabsModule, MatMenuModule,
    RouterModule.forChild(DashCommercantRoutes)
  ],
  declarations: [DashCommercantComponent, ClientComponent, HistoriqueComponent, PromotionComponent, ArchiveClientsComponent, CreatePromotionComponent, PointsVenteComponent, CreatePtvComponent, UpdatePtvComponent, ArchivePtvComponent, PromoptionImage
  ],
  entryComponents: [PromoptionImage]
})
export class DashCommercantModule {}
