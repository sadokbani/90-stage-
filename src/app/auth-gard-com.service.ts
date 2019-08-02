import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGardComService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let comm = sessionStorage.getItem('commercant');
    if (comm == '0')
      return true;

    this.router.navigate(['session/signin']);
    return false;

  }

}
