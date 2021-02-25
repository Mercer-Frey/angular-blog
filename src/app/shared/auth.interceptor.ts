import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { AuthService } from '../admin/shared/services/auth.service'
import { Router } from '@angular/router'
import { catchError } from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authS: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authS.isAuthenticated()) {
      request = request.clone({
        setParams: { auth: this.authS.token },
      })
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('intercept - ' + error)
        if (error.status === 401) {
          this.authS.logout()
          this.router.navigate(['/admin', 'login'], {
            queryParams: {
              authFailed: true,
            },
          })
        }

        return throwError(error)
      })
    )
  }
}
