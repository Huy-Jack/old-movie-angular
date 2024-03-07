import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AuthRes, SignUpBody } from '@interfaces/auth.interface'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject<boolean>(false)

  get isAuthenticated(): boolean {
    return this.isAuthenticated$.getValue()
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signin(username: string, password: string) {
    const url = 'api/auth/signin'
    const body = { username, password }
    this.http.post<AuthRes>(url, body).subscribe((res) => {
      localStorage.setItem('token', res.access_token)
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
    this.router.navigateByUrl('/auth/sign-in')
  }

  autoLogin(): void {
    const token = this.getToken()
    this.isAuthenticated$.next(!!token)
  }
  getToken() {
    return localStorage.getItem('token') ?? ''
  }
}
