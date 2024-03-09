import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Movie } from '@interfaces/movie.interface'
import { ShowTime } from '@interfaces/showtime.interface'
import { map } from 'rxjs'
import moment from 'moment'

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  currentMovie: Movie | null = null

  constructor(private readonly http: HttpClient) {}

  getOngoingMovie(params: { ongoing: boolean }) {
    const url = 'api/movies/get-all'
    const options = { params }
    return this.http.get<Movie[]>(url, options)
  }

  getShowtimes() {
    const url = `api/showtime/${this.currentMovie?.id}`
    return this.http
      .get<ShowTime[]>(url)
      .pipe(map((showtimes) => showtimes.map((showtime) => this.formatShowtime(showtime))))
  }

  formatShowtime(showtime: ShowTime): ShowTime {
    return {
      ...showtime,
      start: moment(showtime.start).format('HH:mm'),
      end: moment(showtime.end).format('HH:mm'),
    }
  }
}
