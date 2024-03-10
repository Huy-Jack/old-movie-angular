import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ToastModule } from 'primeng/toast'
import { NavBarComponent } from './components'
import { User } from './interfaces'
import { LoadingService } from './services'
import { AuthService } from './services/auth/auth.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProgressSpinnerModule, ToastModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService)

  loading$ = inject(LoadingService).loading$
  user$ = this.authService.user$

  ngOnInit() {
    this.authService.autoLogin()
  }
}
