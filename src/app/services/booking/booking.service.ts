import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Seat } from '@interfaces/seat.interface'
import { PaymentPayload } from '@interfaces/payment.inteface'

@Injectable()
export class BookingService {
  httpClient: HttpClient = inject(HttpClient)
  url: string = 'api/booking/ticket'

  constructor() {}

  bookingPayment(paymentPayload: PaymentPayload): Observable<Seat[]> {
    return this.httpClient.post<Seat[]>(this.url, paymentPayload)
  }
}
