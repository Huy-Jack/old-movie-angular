import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Seat } from '@interfaces/seat.interface'

@Injectable()
export class SeatService {
  httpClient: HttpClient = inject(HttpClient)
  url: string = 'api/seat'

  constructor() {}

  getSeat(id:string):Observable<Seat[]>{
    return this.httpClient.get<Seat[]>(this.url+`/${id}`)
  }
}
