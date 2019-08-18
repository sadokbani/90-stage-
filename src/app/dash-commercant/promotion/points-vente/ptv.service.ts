
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PtvService {
    uri = 'http://localhost:3000/ptv';

    constructor(private http: HttpClient,
                private  router: Router) {
    }

    addPtv(Nom, Priority, ID_commercant) {
        const obj = {
            Nom,
            Priority,
            ID_commercant,
        };
        console.log(obj);
        this.http.post(`${this.uri}/add`, obj)
            .subscribe(res => {
                console.log('Done');
                this.router.navigate(['commer/pointsVente']);
            });
    }

    getPtv(id) {
        return this
            .http
            .get(`${this.uri}/${id}`);
    }

    getPtvarchive(id) {
        return this
            .http
            .get(`${this.uri}/archive/${id}`);
    }



    restaurerPtv(id) {
        return this.http.put(`${this.uri}/restaurer_ptv/${id}`, null);
    }

    archiverPtv(id) {
        return this.http.put(`${this.uri}/archiver_ptv/${id}`, null);
    }

    editPtv(id) {
        return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }

    updatePtv(Nom, Priority, id) {
        const obj = {
            Nom,
            Priority,
        };
        this
            .http
            .put(`${this.uri}/update/${id}`, obj)
            .subscribe(res => {
                console.log('Done');
                // this.router.navigate(['commer/promotions']);

            });
    }

    delete(id) {
        return this
            .http
            .delete(`${this.uri}/delete/${id}`);
    }

}

