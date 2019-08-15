import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../dashboard/users/service/user.service';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../session.service';
import {ServiceService} from '../signin/service.service';
import {AuthService} from 'angular-6-social-login';
@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.scss']
})
export class ConfirmedComponent implements OnInit {

    constructor(private fb: FormBuilder, private router: Router, private userService: UserService ,  private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
      let email = this.activatedRoute.snapshot.paramMap.get('email');
      console.log(email);
      this.userService.confirm(email).subscribe();
      swal.fire({
          type: 'success',
          title: 'félicitation votre compte a été confirmé ',
          showConfirmButton: false,
          timer: 1500
      });
      this.router.navigate(['/session/signin']);
  }

}
