import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueServiceService {
  uri = 'http://localhost:8000/historique';

  constructor(private http: HttpClient,
              private router: Router) { }

  addhistorique( Utilisateur, Promotion, Coupon , Date, Remise, Etat) {
    const obj = new FormData();
    obj.append('Utilisateur', Utilisateur);
    obj.append('Promotion', Promotion);
    obj.append('Coupon', Coupon);
    obj.append('Date', Date);
    obj.append('Remise', Remise);
   // obj.append('Date', Date);
    obj.append('Etat', Etat);
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => {
        console.log('Done');
        this.router.navigate(['admin/historique']);

      });
  }
  gethistorique() {
    return this
      .http
      .get(`${this.uri}`);
  }

  edithistorique(id) {
    return this
      .http
      .get<any>(`${this.uri}/edit/${id}`);
  }


  updatehistorique( Utilisateur, Promotion, Coupon , Remise, Date, Etat , id){

    this.http.put(`http://localhost:8000/historique/${id}`,
      {
        Utilisateur: Utilisateur,
        Promotion: Promotion,
        Coupon: Coupon,
        Remise: Remise,
        Date: Date,
        Etat: Etat,
      }).subscribe(
      responseData => {
        console.log(responseData);
      }
    );
  }
  delete(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
}

