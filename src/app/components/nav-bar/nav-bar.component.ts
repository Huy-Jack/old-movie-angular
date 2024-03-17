import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthService } from '@services/index'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, InputTextModule, AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  username$ = this.authService.usernameObservable
  constructor(private authService: AuthService) {}
  onSignoutClick() {
    this.authService.signout()
  }
}
