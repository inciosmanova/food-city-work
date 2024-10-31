
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { LoadingService } from '../_services/loading-serive.service';
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(public loadingService: LoadingService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('aaaann');

    this.loadingService.busy();
    return next.handle(request).pipe(
      finalize(() => this.loadingService.idle())
    );
  }
}
