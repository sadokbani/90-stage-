import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {email} from 'ng2-validation/dist/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
    uri = 'http://localhost:8000/user';
  constructor(private http: HttpClient) { }
  sendEmail(url, data) {
    return this.http.post(url, data);
  }
    exist(email) {
    console.log(email);
        return this.http.get<{message: string, users: any}>(`${this.uri}/exist/${email}`);


    }
}
