import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { BookingComponent } from './pages/booking/booking.component'
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component'

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('./pages/auth/index')).routes,
  },
  {
    path: 'booking/:movieId/:showTimeId',
    component: BookingComponent,
  },
  {
    path: 'detail/:movieId',
    component: MovieDetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
]
