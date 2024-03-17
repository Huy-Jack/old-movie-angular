import { AsyncPipe } from '@angular/common'
import { Component, inject, Input, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { PaymentPayload } from '@interfaces/payment.inteface'
import { Seat } from '@interfaces/seat.interface'
import { ShowTime } from '@interfaces/showtime.interface'
import { BookingService } from '@services/booking/booking.service'
import { SeatService } from '@services/seat/seat.service'
import { ShowtimeService } from '@services/showtime/showtime.service'
import { ToastService } from '@services/toast/toast.service'
import { ButtonModule } from 'primeng/button'
import { CarouselModule } from 'primeng/carousel'
import { DialogModule } from 'primeng/dialog'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { TagModule } from 'primeng/tag'
import { Observable } from 'rxjs'

@Component({
  standalone: true,
  imports: [RouterModule, CarouselModule, TagModule, ButtonModule, AsyncPipe, DialogModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [ShowtimeService, SeatService, DialogService, BookingService],
})
export class BookingComponent implements OnInit {
  @Input() movieId: string
  @Input() showTimeId: string
  private readonly bookingService = inject(BookingService)
  private readonly showTimeService = inject(ShowtimeService)
  private readonly seatService = inject(SeatService)
  private readonly router = inject(Router)
  private readonly toastService = inject(ToastService)

  showTimeSelected: string = ''
  seatSelected: string[] = []
  showTime$!: Observable<ShowTime[]>
  seat$!: Observable<Seat[]>
  ref: DynamicDialogRef | undefined
  isShowPaymentConfirm: boolean = false

  get totalPrice() {
    const numberOfSeat = this.seatSelected.length
    return (numberOfSeat * 60000).toLocaleString()
  }

  ngOnInit(): void {
    if (!this.movieId && !this.showTimeId) return
    this.showTime$ = this.showTimeService.getShowTime(this.movieId)
    this.seat$ = this.seatService.getSeat(this.showTimeId)
    this.showTimeSelected = this.showTimeId
  }

  onChangeShowTime(showTimeId: string): void {
    this.seat$ = this.seatService.getSeat(showTimeId)
    this.showTimeSelected = showTimeId
    this.router.navigate(['/booking', this.movieId, showTimeId])
  }
  onSeatSelect(seatId: string): void {
    if (!this.seatSelected.includes(seatId)) {
      this.seatSelected.push(seatId)
      return
    }
    this.seatSelected = this.seatSelected.filter((item) => item !== seatId)
  }
  onBackClick() {
    this.router.navigateByUrl(`/detail/${this.movieId}`)
  }
  showPayment() {
    this.isShowPaymentConfirm = true
  }
  onBookClick() {
    const paymentPayload: PaymentPayload = {
      showtimeId: this.showTimeId,
      seat: this.seatSelected,
    }
    this.bookingService.bookingPayment(paymentPayload).subscribe((res) => {
      this.isShowPaymentConfirm = false
      this.seat$ = this.seatService.getSeat(this.showTimeId)
      this.toastService.showSuccess('Book Movie Tickets Successfully')
    })
  }
}
