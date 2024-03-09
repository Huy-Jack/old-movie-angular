import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Banner } from '@interfaces/banner.interface'

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private readonly http: HttpClient) {}

  getAllBanners() {
    const url = 'api/banner/all'
    return this.http.get<Banner[]>(url)
  }
}
