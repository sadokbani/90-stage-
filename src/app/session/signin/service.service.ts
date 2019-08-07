import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  isCommercant(email) {
    return this.http.get<any>(`http://localhost:3000/user/commercant/${email}`);
  }
}
