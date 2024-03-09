import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { MessageService } from 'primeng/api'
import { routes } from './app.routes'
import {
  jwtInterceptor,
  loadingInterceptor,
  serverErrorInterceptor,
  toastInterceptor,
} from './interceptors'

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
        serverErrorInterceptor,
        loadingInterceptor,
        toastInterceptor,
      ]),
    ),
  ],
}
