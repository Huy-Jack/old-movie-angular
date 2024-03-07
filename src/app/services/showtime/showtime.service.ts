import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@environments/environment.development'
import { Observable } from 'rxjs'
import { ShowTime } from '@interfaces/showtime.interface'

@Injectable()
export class ShowtimeService {
  httpClient: HttpClient = inject(HttpClient)
  url: string = environment.api + '/showtime'
  constructor() {}

  getShowTime(movieId: string): Observable<ShowTime[]> {
    const url = this.url + `/${movieId}`
    return this.httpClient.get<ShowTime[]>(url)
  }
}
