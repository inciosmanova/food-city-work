import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../_services/login-service.service';


@Injectable()
export class UnAuthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    private refreshtoken: LoginService,
    private dialog: MatDialog,
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
    });
    return next.handle(request).pipe(
      
      catchError(err => {

        if (err.status === 401) {
          // alert('401')
          const lsRfToken = localStorage.getItem('refreshToken')
          this.refreshtoken.refToken = lsRfToken == null ? undefined : lsRfToken;
          let requestData = {
            refreshToken: this.refreshtoken.refToken
          }
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          


          return of(err);
        }
        throw err;
      })
    );
  }
}
