import { HttpClient } from '@angular/common/http'
import { Injectable, signal, WritableSignal } from '@angular/core'
import { Router } from '@angular/router'
import { AuthRes, SignUpBody } from '@interfaces/auth.interface'
import { BehaviorSubject, tap } from 'rxjs'
import { User } from '@interfaces/user.interface'

const defaultUser: User = {
  token: '',
  userInfo: {},
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: WritableSignal<User> = signal<User>(defaultUser)
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signin(username: string, password: string) {
    const url = 'api/auth/signin'
    const body = { username, password }
    this.http
      .post<AuthRes>(url, body)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.access_token)
          this.user.set({ token: res.access_token, userInfo: {} })
        }),
      )
      .subscribe(() => {
        this.router.navigateByUrl('/')
      })
  }

  signup(body: SignUpBody) {
    const url = 'api/auth/signup'
    return this.http.post<AuthRes>(url, body).subscribe((res) => {
      this.router.navigateByUrl('/auth/sign-in')
    })
  }
  signout() {
    localStorage.removeItem('token')
    this.user.set(defaultUser)
    this.router.navigateByUrl('/auth/sign-in')
  }

  autoLogin(): void {
    const token = this.getToken()
    this.user.set({ token, userInfo: {} })
  }
  getToken() {
    return localStorage.getItem('token') ?? ''
  }
}
