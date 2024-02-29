import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { AuthService } from '@services/auth/auth.service'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  signout() {
    this.authService.signout()
  }
}
