import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {SessionService} from '../session.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  hide = true;
  islogin = false;
  constructor(private fb: FormBuilder, private router: Router,
              private sessionService: SessionService) {}

  ngOnInit() {
    sessionStorage.removeItem('admin');
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    // console.log(this.form.value);
    // this.sessionService.loginCommercant(this.form.value).subscribe(
    //   data => {
    //     console.log(data);
    //     localStorage.setItem('token', data.toString());
    //     this.router.navigate(['']);
    //   },
    //   error => {console.log(error)}
    // );
    if (this.form.valid){
      if(this.form.value.email == 'admin@gmail.com' && this.form.value.password=='admin'){
        sessionStorage.setItem('admin', '0');
        this.router.navigate(['']);
      }
      else {
        this.islogin=true;
      }
    } else {
      this.openDialog();
    }

  }

  openDialog(): void {
    swal.fire({
      title: 'Erreur',
      text: "Vous devez remplir tous les champs et entrée une adresse email valide",
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'annuler',
      confirmButtonText: 'ok'
    }) ;
  }
}
