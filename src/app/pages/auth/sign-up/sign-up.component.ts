import { Component } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { AutoValidateDirective } from '@directives/auto-validate.directive'
import { FormDirective } from '@directives/form.directive'

@Component({
  selector: 'app-sign-up',
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

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    const { controls, value, valid } = this.signupForm
    console.log(controls)
    if (!valid) return this.markDirtyForm(controls)
    console.log('Signed Up in with:', value)
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
