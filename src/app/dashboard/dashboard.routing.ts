import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {UsersComponent} from './users/users.component';
import {ClientComponent} from './users/client/client.component';
import {CommercantComponent} from './users/commercant/commercant.component';
import {ArchiveComponent} from './users/archive/archive.component';
import {CategorieComponent} from './categorie/categorie.component';
import {CreateCategorieComponent} from './categorie/create-categorie/create-categorie.component';
import {UpdateCategorieComponent} from './categorie/update-categorie/update-categorie.component';
import {CreateSouscategorieComponent} from './souscategorie/create-souscategorie/create-souscategorie.component';
import {UpdateSouscategorieComponent} from './souscategorie/update-souscategorie/update-souscategorie.component';
import {SouscategorieComponent} from './souscategorie/souscategorie.component';
import { ArchiveCategorieComponent} from './categorie/archive-categorie/archive-categorie.component';
import {ArchiveSouscategorieComponent} from './souscategorie/archive-souscategorie/archive-souscategorie.component';
import {HistoriqueAchatsComponent} from './historique-achats/historique-achats.component';
import {PaysComponent} from './pays/pays.component';
import {CreatePaysComponent} from './pays/create-pays/create-pays.component';
import {UpdatePaysComponent} from './pays/update-pays/update-pays.component';
import {ArchivePaysComponent} from './pays/archive-pays/archive-pays.component';
import {CommentaireComponent} from './commentaire/commentaire.component';
import {CommentaireDesacComponent} from './commentaire/commentaire-desac/commentaire-desac.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {PromotionComponent} from './promotions/promotion/promotion.component';


export const DashboardRoutes: Routes = [

  {
    path: '',
    children: [
      {path: 'accueil', component: DashboardComponent},
      {path: 'users', component: UsersComponent},
      {path: 'archive', component: ArchiveComponent},
      {path: 'client/:id', component: ClientComponent},
      {path: 'commercant/:id', component: CommercantComponent},
      {path: 'categorie', component: CategorieComponent},
      {path: 'categories/create', component: CreateCategorieComponent},
      {path: 'categories/edit/:id', component: UpdateCategorieComponent},
      {path: 'souscategories/create', component: CreateSouscategorieComponent },
      {path: 'souscategories', component: SouscategorieComponent },
      {path: 'editSC/:id', component: UpdateSouscategorieComponent },
      {path: 'archive_categorie', component:  ArchiveCategorieComponent },
      {path: 'archive_souscategorie', component: ArchiveSouscategorieComponent },
      {path: 'historique', component: HistoriqueAchatsComponent },
      {path: 'pays', component: PaysComponent },
      {path: 'archive_pays', component: ArchivePaysComponent},
      {path: 'pays/create', component: CreatePaysComponent},
      {path: 'pays/edit/:id', component: UpdatePaysComponent},
      {path: 'commentaire', component: CommentaireComponent},
      {path: 'commentaireDesc', component: CommentaireDesacComponent},
      {path: 'promotions', component: PromotionsComponent},
      {path: 'promotion/:id', component: PromotionComponent},
    ]
  }

];
