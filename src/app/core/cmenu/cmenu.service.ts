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
    state: 'accueil',
    name: 'Accueil',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'client',
    name: 'Clients ',
    type: 'link',
    icon: 'supervised_user_circle'
  }
];

@Injectable()
export class CmenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu) {
    MENUITEMS.push(menu);
  }
}
