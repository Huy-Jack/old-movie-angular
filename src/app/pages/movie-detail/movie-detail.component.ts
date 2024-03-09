import { Component, OnInit } from '@angular/core'
import { SafeResourceUrl } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { Movie } from '@interfaces/movie.interface'
import { ShowTime } from '@interfaces/showtime.interface'
import { MovieService } from '@services/movie/movie.service'
import { SafePipe } from 'app/pipes/safe.pipe'
import moment from 'moment'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [ButtonModule, SafePipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null
  showtimes: ShowTime[]
  constructor(
    private movieService: MovieService,
    private router: Router,
  ) {
    this.movie = movieService.currentMovie
    // this.trailerVideoUrl = movieService.currentMovie?.trailer
  }

  ngOnInit(): void {
    this.movieService.getShowtimes().subscribe((res) => {
      this.showtimes = res
    })
  }

  getFormattedReleaseDate(date?: Date) {
    return date ? moment(date).format('DD/MM/YYYY') : ''
  }

  getShowtimeLabel(showtime: ShowTime) {
    return `${showtime.start} - ${showtime.end}`
  }

  onShowtimeClick(showtime: ShowTime) {
    this.router.navigateByUrl(`/booking/${showtime.movieId}/${showtime.id}`)
  }
}
