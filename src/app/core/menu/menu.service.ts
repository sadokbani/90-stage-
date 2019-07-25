import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'Accueil',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'users',
    name: 'Utilisateurs ',
    type: 'link',
    icon: 'supervised_user_circle'
  },
  {
    state: 'categorie',
    name: 'Categorie ',
    type: 'link',
    icon: 'bookmark'
  },
  {
    state: 'souscategories',
    name: 'Sous Categorie ',
    type: 'link',
    icon: 'class'
  },
  {
    state: 'historique',
    name: "Historique d'achat ",
    type: 'link',
    icon: 'update'
  },
  // {
  //   state: 'http://primer.nyasha.me/docs',
  //   name: 'DOCS',
  //   type: 'extTabLink',
  //   icon: 'local_library'
  // }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu) {
    MENUITEMS.push(menu);
  }
}
