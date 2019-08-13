import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EmailService} from './email.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {isUndefined} from "util";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router , private email: EmailService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ]
    });
  }

  onSubmit() {
    let user = {
      email: this.form.value.email
    }
    this.email.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data;
      },
      err => {
        console.log(err);

      },
    );

  }
}
