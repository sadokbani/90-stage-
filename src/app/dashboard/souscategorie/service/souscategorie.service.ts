import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SouscategorieService {
  uri = 'http://localhost:3000/souscategorie';
  constructor(private http: HttpClient,
              private  router: Router) { }
  addSousCategorie( SousCategorieNom, CategorieNom,  Priority ) {
    const obj = {
      SousCategorieNom,
      CategorieNom,
      Priority,
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => { console.log('Done'); this.router.navigate(['souscategories']);});
  }
  getSousCategorie() {
    return this
      .http
      .get(`${this.uri}`);
  }
  editCategorie(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }
  updateCategorie( SousCategorieNom, CategorieNom,  Priority  , id) {
    const obj = {
      SousCategorieNom,
      CategorieNom,
      Priority,
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => {
        console.log('Done');
        this.router.navigate(['souscategories']);

      });
  }
  delete(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
}

