import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {SessionService} from '../session.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private router: Router,
              private sessionService: SessionService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.sessionService.loginCommercant(this.form.value).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data.toString());
        this.router.navigate(['']);
      },
      error => {console.log(error)}
    );
  }
}
