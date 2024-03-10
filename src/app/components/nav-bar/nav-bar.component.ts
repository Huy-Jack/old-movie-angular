import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthService } from '@services/index'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, InputTextModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(private authService: AuthService) {}
  onSignoutClick() {
    this.authService.signout()
  }
}
