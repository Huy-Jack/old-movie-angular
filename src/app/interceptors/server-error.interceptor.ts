import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@services/auth/auth.service'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

/**
 * Interceptor that handles server errors.
 *
 * @param request The request object.
 * @param next The next interceptor in the chain.
 *
 * @returns The next Observable.
 */
export const serverErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router)
  const authService = inject(AuthService)

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if ([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(error.status)) {
        authService.signout()
        router.navigateByUrl('/auth/sign-in')
      }

      return throwError(() => error)
    }),
  )
}
