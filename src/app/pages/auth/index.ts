import { Routes } from '@angular/router'
import { SignInComponent } from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'

export const routes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign In',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    title: 'Sign Up',
    component: SignUpComponent,
  },
]
