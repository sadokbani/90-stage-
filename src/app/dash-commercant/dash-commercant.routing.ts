import { Routes } from '@angular/router';
import {DashCommercantComponent} from './dash-commercant.component';
import {ClientComponent} from './client/client.component';
import {HistoriqueComponent} from './historique/historique.component';
import {PromotionComponent} from './promotion/promotion.component';
import {ArchiveClientsComponent} from './client/archive-clients/archive-clients.component';
import {CreatePromotionComponent} from './promotion/create-promotion/create-promotion.component';
import {PromotionsComponent} from '../dashboard/promotions/promotions.component';
import {PointsVenteComponent} from './promotion/points-vente/points-vente.component';
import {CreatePtvComponent} from './promotion/points-vente/create-ptv/create-ptv.component';
import {ArchivePtvComponent} from  './promotion/points-vente/archive-ptv/archive-ptv.component';
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
      {
        path: 'historique',
        component: HistoriqueComponent
      },
      {
        path: 'archive',
        component: ArchiveClientsComponent
      },
      {
        path: 'promotion',
        component: PromotionComponent
      },
      {path: 'promotion/:id', component: CreatePromotionComponent},
        {path: 'pointsVente', component: PointsVenteComponent},
        {path: 'createpointsVente', component: CreatePtvComponent},
        {path: 'archivePTV', component: ArchivePtvComponent},
    ]
  }
];
