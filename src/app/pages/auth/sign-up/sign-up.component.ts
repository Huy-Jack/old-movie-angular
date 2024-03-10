import { Component } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { AutoValidateDirective } from '@directives/auto-validate.directive'
import { FormDirective } from '@directives/form.directive'
import { AuthService } from '@services/auth/auth.service'
import { SignUpBody } from '@interfaces/auth.interface'

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CalendarModule,
    AutoValidateDirective,
    FormDirective,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signupForm!: FormGroup

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    const { controls, value, valid } = this.signupForm
    if (!valid) return this.markDirtyForm(controls)
    const { userName, password, firstName, lastName, email, phoneNumber, dob } = value
    const body: SignUpBody = { userName, password, firstName, lastName, email, phoneNumber, dob }
    this.authService.signup(body)
  }
  passwordValidation: ValidatorFn = (control: AbstractControl) => {
    const parentControl = control.parent
    if (!parentControl) return null
    if (control.value !== parentControl.value.password) {
      return { confirmPassword: true }
    }
    return null
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
