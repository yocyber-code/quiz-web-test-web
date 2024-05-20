import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap, Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import moment from 'moment';
import { CoreService } from './app/core/core.service';

@Injectable()
export class ManageHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private coreService: CoreService) {}
  selectorCache: Map<string, HttpResponse<any>> = new Map<string, HttpResponse<any>>();
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cache = this.selectorCache.get(req.urlWithParams);
    if (cache) {
      return of(cache);
    }

    this.findAndProcessDatetime(req.body);

    return next
      .handle(req)
      .pipe(
        catchError((error: HttpErrorResponse): any => {
          switch (error.status) {
            case 0:
              break;
            case 400:
            case 401:
            case 403:
            case 404:
            case 405:
            case 406:
            case 409:
            case 415:
            case 500:
              this.handleError(error);
              break;
          }
          return throwError(() => new Error(error?.error));
        }),
      )
      .pipe(
        tap((resp: any) => {
          if (resp instanceof HttpErrorResponse) return;
          if (resp instanceof HttpResponse && req.method === 'GET' && req.urlWithParams.includes('/selector/')) {
            this.selectorCache.set(req.urlWithParams, resp);
            setTimeout(() => {
              this.selectorCache.delete(req.urlWithParams);
            }, 30 * 1000);
          }
        }),
      );
  }

  findAndProcessDatetime(data: any) {
    if (Array.isArray(data)) {
      data.forEach((item) => this.findAndProcessDatetime(item));
    } else if (typeof data === 'object') {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          if (value instanceof Date) {
            data[key] = moment(value).utc(true).toDate();
          } else if (value && Array.isArray(value)) {
            this.findAndProcessDatetime(value);
          }
        }
      }
    }
  }

  async handleError(error: any) {
    if (
      error?.error?.Code == 403 ||
      error?.error?.code == 403 ||
      error?.error?.Code == 401 ||
      error?.error?.code == 401
    ) {
      this.coreService.utilities.toast.error(error.error.messagealt ?? error.error.message ?? '');
      const token = this.coreService.utilities.storage.getIdentity();
      if (token) {
        this.coreService.utilities.storage.clear();
        window.location.reload();
      }
      return;
    }
    this.coreService.utilities.toast.error(error.error.messagealt ?? error.error.message ?? '');
  }
}
