import { Routes } from '@angular/router'
import { authGuard } from './guards'
import { HomeComponent } from './pages/home/home.component'

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: async () => (await import('./pages/home/home.component')).HomeComponent,
    // canMatch: [authGuard()],
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('./pages/auth/index')).routes,
    // canMatch: [authGuard({ requiresAuthentication: false })],
  },
  {
    path: '**',
    redirectTo: '',
  },
]
