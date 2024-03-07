import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  httpClient: HttpClient = inject(HttpClient)
  url: string = environment.api + '/showtime'

  constructor() { }

  getSeatByShowtimeId
}
