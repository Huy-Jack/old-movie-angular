// cache.service.ts
import { HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  public cache = new Map<string, HttpResponse<any>>()
}
