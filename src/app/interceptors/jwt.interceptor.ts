import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
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

  const isRequestAuthorized = authService.isAuthenticated

  if (isRequestAuthorized) {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    })

    return next(clonedRequest)
  }

  return next(request)
}
