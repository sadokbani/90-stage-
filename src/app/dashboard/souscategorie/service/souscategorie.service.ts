import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SouscategorieService {
  uri = 'http://localhost:8000/souscategorie';
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
      .subscribe(res => { console.log('Done'); this.router.navigate(['admin/souscategories']);});
  }
  getSousCategorie() {
    return this
      .http
      .get(`${this.uri}`);
  }

  getSousCategorie_byCategorie(selected) {
    return this
      .http
      .get( `${this.uri}/selected_SousCategorie/${selected}`  );
  }

  getSousCategoriearchive() {
    return this
      .http
      .get(`${this.uri}/archive`);
  }
  getSousCategoriearchive_byCategorie(selected) {
    return this
      .http
      .get(`${this.uri}/archive/${selected}`);
  }
  restaurerSousCategorie(id) {
    return this.http.put(`${this.uri}/restaurer_souscategorie/${id}`,null);
  }
  archiverSousCategorie(id) {
    return this.http.put(`${this.uri}/archiver_souscategorie/${id}`,null);
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
      .put(`${this.uri}/update/${id}`, obj)
      .subscribe(res => {
        console.log('Done');
        this.router.navigate(['admin/souscategories']);

      });
  }
  delete(id) {
    return this
      .http
      .delete(`${this.uri}/delete/${id}`);
  }
}

