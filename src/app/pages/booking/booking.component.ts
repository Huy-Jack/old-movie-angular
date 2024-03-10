import { AsyncPipe } from '@angular/common'
import { Component, inject, Input, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { Seat } from '@interfaces/seat.interface'
import { ShowTime } from '@interfaces/showtime.interface'
import { SeatService } from '@services/seat/seat.service'
import { ShowtimeService } from '@services/showtime/showtime.service'
import { ButtonModule } from 'primeng/button'
import { CarouselModule } from 'primeng/carousel'
import { TagModule } from 'primeng/tag'
import { Observable } from 'rxjs'

@Component({
  standalone: true,
  imports: [RouterModule, CarouselModule, TagModule, ButtonModule, AsyncPipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [ShowtimeService, SeatService],
})
export class BookingComponent implements OnInit {
  @Input() movieId: string
  @Input() showTimeId: string
  private readonly showTimeService: ShowtimeService = inject(ShowtimeService)
  private readonly seatService: SeatService = inject(SeatService)
  private readonly router: Router = inject(Router)

  showTimeSelected: string = ''
  seatSelected: string = ''
  showTime$!: Observable<ShowTime[]>
  seat$!: Observable<Seat[]>

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
  onSeatSlect(seatId: string): void {
    this.seatSelected = seatId
  }
  onBackClick() {
    this.router.navigateByUrl(`/detail/${this.movieId}`)
  }
}
