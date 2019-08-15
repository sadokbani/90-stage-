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
import {ServiceService} from './service.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import {UserService} from '../../dashboard/users/service/user.service';

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
              private sessionService: SessionService,
              private signinService: ServiceService,
              private socialAuthService: AuthService,
              private userService: UserService) {}
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform+" sign in data : " , userData);
          this.signinService.isExist(userData.email).subscribe(
              data=>{
            sessionStorage.setItem('commercantId', data._id);
            sessionStorage.setItem('commercantNom', data.nom);
            sessionStorage.setItem('commercant', '0');
            this.router.navigate(['/commer/accueil']);
          },
              error => {
    this.signinService.addSocial(userData.name,userData.email,userData.image,userData.token).subscribe(
        (response: any)=>{
          sessionStorage.setItem('commercantId', response._id);
          sessionStorage.setItem('commercantNom', response.nom);
          sessionStorage.setItem('commercant', '0');
          this.router.navigate(['/commer/accueil']);
        }
    )
              }

              )
          // Now sign-in with userData
          // ...

        }
    );
  }
  ngOnInit() {
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('commercant');
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
        this.signinService.isCommercant(this.form.value.email,this.form.value.password).subscribe(
          data => {
              if (data.role === 1){
                sessionStorage.setItem('commercantId', data._id);
                sessionStorage.setItem('commercantNom', data.nom);
                sessionStorage.setItem('commercant', '0');
                this.router.navigate(['/commer/accueil']);
              }
              if (data.role === 0){
                sessionStorage.setItem('admin', '0');
                this.router.navigate(['/admin/accueil']);
              }

            },
          error =>{
            this.islogin = true;

          }


        );


      // else {
      //   this.islogin=true;
      // }
    } else {
      this.openDialog();
    }

  }

  openDialog(): void {
    swal.fire({
      title: 'Erreur',
      text: "Vous devez remplir tous les champs et entrer une adresse émail valide.",
      type: 'error',
      showCancelButton: false,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',
      cancelButtonText: 'annuler',
      confirmButtonText: 'ok'
    }) ;
  }
}
