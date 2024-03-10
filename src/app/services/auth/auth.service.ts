import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AuthRes, SignUpBody } from '@interfaces/auth.interface'
import { User } from '@interfaces/user.interface'
import { BehaviorSubject } from 'rxjs'

const defaultUser: User = {
  token: '',
  userInfo: {},
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(defaultUser)

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signin(username: string, password: string) {
    const url = 'api/auth/signin'
    const body = { username, password }
    this.http.post<AuthRes>(url, body).subscribe((res) => {
      localStorage.setItem('token', res.access_token)
      this.user$.next({ token: res.access_token, userInfo: {} })
      this.router.navigateByUrl('/')
    })
  }

  signup(body: SignUpBody) {
    const url = 'api/auth/signup'
    return this.http.post<AuthRes>(url, body).subscribe(() => {
      this.router.navigateByUrl('/auth/sign-in')
    })
  }
  signout() {
    localStorage.removeItem('token')
    this.user$.next(defaultUser)
    this.router.navigateByUrl('/auth/sign-in')
  }

  autoLogin(): void {
    const token = this.getToken()
    this.user$.next({ token, userInfo: {} })
  }
  getToken() {
    return localStorage.getItem('token') ?? ''
  }
}
