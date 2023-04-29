import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { DomainName } from './PathTools';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class EshopInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(Preferences.get({ key: 'eshop-cookie' })).pipe(map((token: { value: string }) => {
      if (token !== null && token.value !== null) {
        return req.clone({
          url: DomainName + req.url,
          headers: req.headers
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', ['POST', 'GET', 'PUT', 'OPTIONS', 'DELETE'])
            .append('Authorization', 'Bearer ' + token.value),
          withCredentials: false
        });
      } else {
        return req.clone({
          url: DomainName + req.url,
          headers: req.headers
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', ['POST', 'GET', 'PUT', 'OPTIONS', 'DELETE']),
          withCredentials: false
        });
      }
    }), switchMap((request: HttpRequest<any>) => {
      return next.handle(request);
    }));
  }
}
