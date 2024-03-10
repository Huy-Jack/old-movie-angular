import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { User } from '@interfaces/user.interface'
import { AuthService } from '@services/auth/auth.service'

/**
 * Interceptor that adds an Authorization header to requests that are authenticated and target the API URL.
 *
 * @param request The request object.
 * @param next The next interceptor in the chain.
 *
 * @returns The next Observable.
 */
export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService)
  if (authService.user$.value.token) {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: authService.getToken(),
      },
    })
    return next(clonedRequest)
  }
  return next(request)
}
