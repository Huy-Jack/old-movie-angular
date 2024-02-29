import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { provideHttpClient, withInterceptors } from '@angular/common/http'

import { routes } from './app.routes'
import { jwtInterceptor, serverErrorInterceptor } from './interceptors'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withInterceptors([serverErrorInterceptor, jwtInterceptor])),
  ],
}
