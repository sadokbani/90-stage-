import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {UsersComponent} from './users/users.component';
import {ClientComponent} from './users/client/client.component';
import {CommercantComponent} from './users/commercant/commercant.component';
import {ArchiveComponent} from './users/archive/archive.component';
import {CategorieComponent} from './categorie/categorie.component';
import {CreateCategorieComponent} from './categorie/create-categorie/create-categorie.component';
import {UpdateCategorieComponent} from './categorie/update-categorie/update-categorie.component';
import {CreateSouscategorieComponent} from  './souscategorie/create-souscategorie/create-souscategorie.component';
import {UpdateSouscategorieComponent} from  './souscategorie/update-souscategorie/update-souscategorie.component';
import {SouscategorieComponent} from './souscategorie/souscategorie.component';
export const DashboardRoutes: Routes = [
  {path: '', component: DashboardComponent},
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
];
