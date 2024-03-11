import { Component, inject, Input, ViewEncapsulation } from '@angular/core'
import { AutoValidateDirective } from '@directives/auto-validate.directive'
import { FormDirective } from '@directives/form.directive'
import { AbstractControl, FormGroup, FormsModule, ValidatorFn } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { InputMaskModule } from 'primeng/inputmask'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { BookingService } from '@services/booking/booking.service'
import { PaymentPayload } from '@interfaces/payment.inteface'
import { ActivatedRoute } from '@angular/router'
import { delay, of, switchMap } from 'rxjs'
import { MessageService } from 'primeng/api'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { SpinnerComponent } from '@components/spinner/spinner.component'
import { LoadingService } from '@services/loading/loading.service'

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    AutoValidateDirective,
    FormDirective,
    FormsModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    ProgressSpinnerModule,
    SpinnerComponent,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [BookingService],
})
export class PaymentComponent {
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef)
  private readonly bookingService: BookingService = inject(BookingService)
  private readonly _route: ActivatedRoute = inject(ActivatedRoute)
  private readonly messageService: MessageService = inject(MessageService)
  private readonly loadingService: LoadingService = inject(LoadingService)

  paymentForm: FormGroup
  seatSelected: string[] = []

  constructor(public config: DynamicDialogConfig) {
    this.seatSelected = config.data
  }

  cardNumberValidation: ValidatorFn = (control: AbstractControl) => {
    if (!control.value) return null
    const isValid = /^\d{16}$/.test(control.value.replace(/\s/g, ''))
    return isValid ? null : { invalidCreditCard: true }
  }

  onSubmit() {
    const { controls, value, valid } = this.paymentForm
    if (!valid) return this.markDirtyForm(controls)
    const { showTimeId } = this._route.snapshot.params
    const payload: PaymentPayload = { showtimeId: showTimeId, seat: this.seatSelected }

    // Remove if we don't want to mock the delay in payment.
    this.loadingService.showLoader()
    of(null)
      .pipe(
        delay(5000),
        switchMap(() => {
          return this.bookingService.bookingPayment(payload)
        }),
      )
      .subscribe(() => {
        this.ref.close({ isPay: true })
        this.messageService.add({
          severity: 'success',
          summary: 'SUCCESS',
          detail: 'Payment successfully!',
        })
      })
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
