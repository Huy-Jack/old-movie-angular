import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { PaymentPayload } from '@interfaces/payment.inteface'
import { Seat } from '@interfaces/seat.interface'
import { ToastService } from '@services/toast/toast.service'
import { Observable } from 'rxjs'

@Injectable()
export class BookingService {
  private httpClient = inject(HttpClient)
  private url: string = 'api/booking/ticket'

  bookingPayment(paymentPayload: PaymentPayload): Observable<any> {
    return this.httpClient.post<Seat[]>(this.url, paymentPayload)
  }
}
