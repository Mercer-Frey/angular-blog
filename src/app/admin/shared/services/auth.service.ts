import { FBAuthResponse } from './../../../shared/interfaces'
import { environment } from '../../../../environments/environment'
import { Observable, Subject, throwError } from 'rxjs'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from 'src/app/shared/interfaces'
import { catchError, tap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthService {
  public error$ = new Subject<string>()

  constructor(private http: HttpClient) {}
  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }
  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)))
  }
  logout() {
    this.setToken(null)
  }
  isAuthenticated(): boolean {
    return !!this.token
  }
  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    const { message } = error.error.error
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next(message)
        break
      case 'INVALID_PASSWORD':
        this.error$.next(message)
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next(message)
        break
      default:
        break
    }
    return throwError(error)
  }
  private setToken(response: FBAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
