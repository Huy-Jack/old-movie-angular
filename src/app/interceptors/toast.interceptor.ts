// toast.interceptor.ts
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { MessageService } from 'primeng/api'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

export const toastInterceptor: HttpInterceptorFn = (request, next) => {
  const messageService = inject(MessageService)
  function handleHttpError(error: HttpErrorResponse): void {
    const errorMessage = getErrorMessage(error)
    messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
    })
  }

  function handleOtherError(): void {
    const errorMessage = 'An error occurred'
    messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
    })
  }

  function getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return `An error occurred: ${error.error.message}`
    } else {
      // Server-side error
      return `HTTP error ${error.status}: ${error.error.message}`
    }
  }

  return next(request).pipe(
    catchError((error) => {
      console.log('error: ', error)
      if (error instanceof HttpErrorResponse) {
        handleHttpError(error)
      } else {
        handleOtherError()
      }
      return throwError(() => error)
    }),
  )
}
