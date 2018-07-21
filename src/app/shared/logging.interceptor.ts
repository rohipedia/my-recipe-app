import { HttpHandler, HttpEvent, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(tap(
            event => {
                console.log('Logging interceptor', event);
            }
        ))
    }

}