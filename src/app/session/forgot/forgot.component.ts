import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EmailService} from './email.service';
import swal from "sweetalert2";
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

    constructor(private fb: FormBuilder, private router: Router, private email: EmailService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: [
                null,
                Validators.compose([Validators.required, CustomValidators.email])
            ]
        });
    }

    onSubmit() {
        if (this.form.valid) {
            let user = {
                email: this.form.value.email
            }

            const anes = this.email.exist(user.email).subscribe(
                response => {
                    console.log(response.users);
                    if (response.users > 0) {
                        this.email.sendEmail("http://localhost:3000/mail", user).subscribe(
                            data => {
                                let res: any = data;
                                swal.fire({
                                    type: 'success',
                                    title: 'email de recupération est envoyé  ',
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
                        swal.fire({
                            type: 'error',
                            title: 'compte introuvable ',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                },
                err => {
                    console.log(err);

                },
            );

        } else {
            swal.fire({
                type: 'error',
                title: 'vous devez saisir un email valide',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

}
