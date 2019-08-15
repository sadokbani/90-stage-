import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomValidators} from 'ng2-validation';
import {mimeType} from '../signup/mime-type.validator';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import swal from "sweetalert2";
import {ResetService} from './reset.service';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;
    hide = true;
    hide1 = true;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
              private http: HttpClient , private reset: ResetService , private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.form = this.fb.group({

      password: password,
      confirmPassword: confirmPassword,

    });
  }
  onSubmit() {
      if (this.form.valid) {
          let email = this.activatedRoute.snapshot.paramMap.get('email');
          console.log(email);
          this.reset.update(email, this.form.value.password);
          swal.fire({
              type: 'success',
              title: 'votre mot de passe a été réinitialisé ',
              showConfirmButton: false,
              timer: 1500
          });
          this.router.navigate(['/session/signin']);
      } else  {
          swal.fire({
              type: 'error',
              title: 'vérifier votre mot de passe  ',
              showConfirmButton: false,
              timer: 1500
          });

      }
  }

}
