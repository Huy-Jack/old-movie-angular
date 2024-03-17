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
  private userName$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  get usernameObservable() {
    return this.userName$.asObservable()
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
      localStorage.setItem('username', res.user.userName)
      this.user$.next({ token: res.access_token, userInfo: {} })
      this.userName$.next(res.user.userName)
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
    localStorage.removeItem('username')
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
