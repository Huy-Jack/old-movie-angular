import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ToastModule } from 'primeng/toast'
import { LoadingService } from './services'
import { AuthService } from './services/auth/auth.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProgressSpinnerModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService)

  loading$ = inject(LoadingService).loading$
  user = this.authService.user()

  ngOnInit() {
    this.authService.autoLogin()
  }
}
