import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { MessageService } from 'primeng/api'
import { routes } from './app.routes'
import {
  cachingInterceptor,
  jwtInterceptor,
  loadingInterceptor,
  serverErrorInterceptor,
  toastInterceptor,
} from './interceptors'

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
        cachingInterceptor,
        serverErrorInterceptor,
        loadingInterceptor,
        toastInterceptor,
      ]),
    ),
  ],
}
