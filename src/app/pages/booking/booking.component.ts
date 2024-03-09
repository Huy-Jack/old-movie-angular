import { Component, inject, OnInit } from '@angular/core'
import { CarouselModule } from 'primeng/carousel'
import { TagModule } from 'primeng/tag'
import { ButtonModule } from 'primeng/button'
import { ActivatedRoute, Router } from '@angular/router'
import { ShowtimeService } from '@services/showtime/showtime.service'
import { SeatService } from '@services/seat/seat.service'
import { Observable } from 'rxjs'
import { ShowTime } from '@interfaces/showtime.interface'
import { AsyncPipe } from '@angular/common'
import { Seat } from '@interfaces/seat.interface'

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CarouselModule, TagModule, ButtonModule, AsyncPipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [ShowtimeService, SeatService],
})
export class BookingComponent implements OnInit {
  private readonly _route: ActivatedRoute = inject(ActivatedRoute)
  private readonly showTimeService: ShowtimeService = inject(ShowtimeService)
  private readonly seatService: SeatService = inject(SeatService)
  private readonly router: Router = inject(Router)

  showTimeSelected: string = ''
  seatSelected: string = ''
  showTime$!: Observable<ShowTime[]>
  seat$!: Observable<Seat[]>

  ngOnInit(): void {
    const { movieId, showTimeId } = this._route.snapshot.params
    if (!movieId && !showTimeId) return
    this.showTime$ = this.showTimeService.getShowTime(movieId)
    this.seat$ = this.seatService.getSeat(showTimeId)
    this.showTimeSelected = showTimeId
  }

  onChangeShowTime(showTimeId: string): void {
    const { movieId } = this._route.snapshot.params
    this.seat$ = this.seatService.getSeat(showTimeId)
    this.showTimeSelected = showTimeId
    this.router.navigate(['/booking', movieId, showTimeId])
  }
  onSeatSlect(seatId: string): void {
    this.seatSelected = seatId
  }
}
