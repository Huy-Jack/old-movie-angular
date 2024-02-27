import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterOutlet } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  username: string = ''
  password: string = ''

  login() {
    // Your login logic here
    console.log('Logging in with:', this.username, this.password)
  }
}
