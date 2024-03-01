import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { LoadingService } from '@services/index'
import { finalize } from 'rxjs/operators'

// TODO: enhance later
export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  const loadingService = inject(LoadingService)
  loadingService.showLoader()

  return next(request).pipe(
    finalize(() => {
      loadingService.hideLoader()
      return next(request)
    }),
  )
}
