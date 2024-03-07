import { Component, inject, OnInit } from '@angular/core'
import { CarouselModule } from 'primeng/carousel'
import { TagModule } from 'primeng/tag'
import { ButtonModule } from 'primeng/button'
import { ActivatedRoute } from '@angular/router'
import { ShowtimeService } from '@services/showtime/showtime.service'
import { Observable } from 'rxjs'
import { ShowTime } from '@interfaces/showtime.interface'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CarouselModule, TagModule, ButtonModule, AsyncPipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [ShowtimeService],
})
export class BookingComponent implements OnInit {
  private readonly _route: ActivatedRoute = inject(ActivatedRoute)
  private readonly showTimeService: ShowtimeService = inject(ShowtimeService)

  showTimingsSelected = 0
  sheets = Array.from({ length: 88 }, (_, index) => index + 1)
  showTime$!: Observable<ShowTime[]>

  ngOnInit(): void {
    const { movieId } = this._route.snapshot.params
    if (!movieId) return
    this.showTime$ = this.showTimeService.getShowTime(movieId)
  }
}
