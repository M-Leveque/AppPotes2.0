// httpSetHeaders.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
 
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
 
@Injectable()
export class authInterceptor implements HttpInterceptor {
    
    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        // Get session token
        var token = localStorage.getItem('token'); 
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer '+token) });
 
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    domain: error.name,
                    message: error.message,
                    reason: error.error
                };
                return throwError(error);
            }));
    }
}
 