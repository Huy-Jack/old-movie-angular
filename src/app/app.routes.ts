import { Routes } from '@angular/router'

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
    path: 'booking/:movieId',
    loadComponent: async () => (await import('./pages/booking/booking.component')).BookingComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
]
