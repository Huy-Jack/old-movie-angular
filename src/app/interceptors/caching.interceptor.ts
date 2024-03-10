// caching-interceptor.ts
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { CacheService } from '@services/index'
import { of, tap } from 'rxjs'

export const cachingInterceptor: HttpInterceptorFn = (request, next) => {
  let cacheService = inject(CacheService)
  if (request.method !== 'GET') {
    return next(request)
  }

  const cachedResponse = cacheService.cache.get(request.url)
  if (cachedResponse) {
    return of(cachedResponse)
  }

  return next(request).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cacheService.cache.set(request.url, event)
      }
    }),
  )
}
