import { Routes } from '@angular/router'
import { SignInComponent } from './pages/auth/sign-in/sign-in.component'
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component'
import { HomeComponent } from './pages/home/home.component'

export const routes: Routes = [
  { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
  {
    path: 'auth/sign-in',
    title: 'Sign In',
    component: SignInComponent,
  },
  {
    path: 'auth/sign-up',
    title: 'Sign Up',
    component: SignUpComponent,
  },
  { path: 'home', component: HomeComponent },
]
