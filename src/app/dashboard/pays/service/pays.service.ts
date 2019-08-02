
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  uri = 'http://localhost:3000/pays';

  constructor(private http: HttpClient,
              private  router: Router) {
  }

  addPays(Nom, Priority) {
    const obj = {
      Nom,
      Priority,
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => {
        console.log('Done');
        this.router.navigate(['admin/pays']);
      });
  }

  getPays() {
    return this
      .http
      .get(`${this.uri}`);
  }

  getPaysarchive() {
    return this
      .http
      .get(`${this.uri}/archive`);
  }

  restaurerPays(id) {
    return this.http.put(`${this.uri}/restaurer_pays/${id}`, null);
  }

  archiverPays(id) {
    return this.http.put(`${this.uri}/archiver_pays/${id}`, null);
  }

  editPays(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }

  updatePays(Nom, Priority, id) {
    const obj = {
     Nom,
      Priority,
    };
    this
      .http
      .put(`${this.uri}/update/${id}`, obj)
      .subscribe(res => {
        console.log('Done');
        this.router.navigate(['admin/pays']);

      });
  }

  delete(id) {
    return this
      .http
      .delete(`${this.uri}/delete/${id}`);
  }

}
