import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign In',
    loadComponent: async () => (await import('./sign-in/sign-in.component')).SignInComponent,
  },
  {
    path: 'sign-up',
    title: 'Sign Up',
    loadComponent: async () => (await import('./sign-up/sign-up.component')).SignUpComponent,
  },
]
