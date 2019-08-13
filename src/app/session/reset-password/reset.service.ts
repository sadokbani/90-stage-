import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private http: HttpClient,
              private router: Router) { }

  update(email, password) {
    this.http.put(`http://localhost:3000/user/reset/${email},${password}`,
      {
        password: password
      }).subscribe(
      responseData =>{
        console.log(responseData);
      }
    );
  }
}
