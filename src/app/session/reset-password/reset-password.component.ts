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

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
              private http: HttpClient , private reset: ResetService) {
  }

  ngOnInit() {

    this.form = this.fb.group({

      password: password,
      confirmPassword: confirmPassword,

    });
  }
  onSubmit() {
this.reset.update('anestemani00@gmail.com', this.form.value.password);
  }

}
