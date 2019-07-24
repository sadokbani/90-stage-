import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let admin = sessionStorage.getItem('admin');
    if (admin == '0')
      return true;

    this.router.navigate(['session/signin']);
    return false;

  }

}
