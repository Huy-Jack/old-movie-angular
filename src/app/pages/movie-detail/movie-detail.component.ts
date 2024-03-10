import { DatePipe } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Movie } from '@interfaces/movie.interface'
import { ShowTime } from '@interfaces/showtime.interface'
import { MovieService } from '@services/movie/movie.service'
import { SafePipe } from 'app/pipes/safe.pipe'
import { ButtonModule } from 'primeng/button'
import { forkJoin } from 'rxjs'

@Component({
  standalone: true,
  imports: [ButtonModule, SafePipe, DatePipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent implements OnInit {
  @Input() movieId: string
  movie: Movie | null = null
  showtimes: ShowTime[]
  constructor(
    private movieService: MovieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    forkJoin({
      showtimes: this.movieService.getShowtimes(this.movieId),
      movie: this.movieService.getMovieById(this.movieId),
    }).subscribe(({ showtimes, movie }) => {
      this.showtimes = showtimes
      this.movie = movie
    })
  }

  getShowtimeLabel(showtime: ShowTime) {
    return `${showtime.start} - ${showtime.end}`
  }

  onShowtimeClick(showtime: ShowTime) {
    this.router.navigateByUrl(`/booking/${showtime.movieId}/${showtime.id}`)
  }
}
