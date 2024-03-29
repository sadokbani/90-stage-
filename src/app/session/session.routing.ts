import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ConfirmedComponent} from './confirmed/confirmed.component';
export const SessionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: 'error',
        component: ErrorComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      },
        {path: 'confirm/:email',
        component: ConfirmedComponent},
      {
        path: 'reset/:email',
        component: ResetPasswordComponent
      },
      {
        path: 'lockscreen',
        component: LockscreenComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  }
];
