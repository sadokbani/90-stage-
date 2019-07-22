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
    name: 'Home',
    type: 'link',
    icon: 'explore'
  },
  {
    state: 'users',
    name: 'Utilisateurs ',
    type: 'link',
    icon: 'bookmark'
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
    icon: 'bookmark'
  },
  {
    state: 'http://primer.nyasha.me/docs',
    name: 'DOCS',
    type: 'extTabLink',
    icon: 'local_library'
  }
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
