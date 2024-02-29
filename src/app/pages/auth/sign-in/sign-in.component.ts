import { Component } from '@angular/core'
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterOutlet } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { AutoValidateDirective } from '@directives/auto-validate.directive'
import { FormDirective } from '@directives/form.directive'
@Component({
  selector: 'app-sign-in',
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
  form!: FormGroup

  login() {
    // Your login logic here
    const { controls, value, valid } = this.form
    if (!valid) return this.markDirtyForm(controls)
    console.log('Logging in with:', value)
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
