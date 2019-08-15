import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {mimeType} from './mime-type.validator';
import {SessionService} from '../session.service';
import {UserService} from '../../dashboard/users/service/user.service';
import swal from 'sweetalert2';
const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  imagePreview: string;
  hide = true;
  hide1 = true;

  constructor(private fb: FormBuilder, private router: Router,
              private sessionService: SessionService,
              private userService: UserService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password: password,
      confirmPassword: confirmPassword,
      nom: new FormControl('', Validators.required),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }
  openDialog(): void {
    swal.fire({
      title: 'Erreur',
      text: 'Vous devez remplir tous les champs et selectioner une image pour continuer',
      type: 'error',
      showCancelButton: false,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',
      cancelButtonText: 'annuler',
      confirmButtonText: 'ok'
    }) ;
  }
  onSubmit() {
    // this.router.navigate(['/dashboard']);
    if (this.form.valid) {
      this.userService.addCommercant(this.form.value.nom, this.form.value.email, this.form.value.password, this.form.value.image);
        let user = {
            email: this.form.value.email
        }
        this.userService.sendEmail("http://localhost:3000/confirmation", user).subscribe(
            data => {
                let res: any = data;
                swal.fire({
                    type: 'success',
                    title: 'email de confirmation est envoyé  ',
                    showConfirmButton: false,
                    timer: 2000
                });
                this.router.navigate(['/session/signin']);
            },
            err => {
                console.log(err);

            },
        );
    } else {
      this.openDialog();
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
