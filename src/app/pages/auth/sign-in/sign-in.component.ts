import { Component } from '@angular/core'
import { AbstractControl, FormGroup, FormsModule } from '@angular/forms'
import { RouterOutlet } from '@angular/router'
import { AutoValidateDirective } from '@directives/auto-validate.directive'
import { FormDirective } from '@directives/form.directive'
import { AuthService } from '@services/auth/auth.service'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    AutoValidateDirective,
    FormDirective,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  form: FormGroup

  constructor(private authService: AuthService) {}

  signin() {
    // Your login logic here
    const { controls, value, valid } = this.form
    if (!valid) return this.markDirtyForm(controls)
    const { username, password } = value
    this.authService.signin(username, password)
  }

  private markDirtyForm(controls: { [p: string]: AbstractControl<any, any> }): void {
    Object.values(controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty()
        control.updateValueAndValidity({ onlySelf: true })
      }
    })
  }
}
