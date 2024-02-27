import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject<boolean>(false)

  get isAuthenticated(): boolean {
    return this.isAuthenticated$.getValue()
  }

  login(username: string, password: string): void {}

  logout(): void {}
}
