import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // set content type for all requests
        request = request.clone({
            headers: request.headers.set('Content-Type', 'application/json')
        });

        if (request.url.toLowerCase().includes('/api/open')) {
            return next.handle(request);
        }
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(request);
                }
                request = request.clone({
                    headers: request.headers.set('Authorization', user.token)
                });
                return next.handle(request);
            })
        );

    }
}



