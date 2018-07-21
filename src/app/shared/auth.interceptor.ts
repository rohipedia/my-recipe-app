import { AuthService } from './../auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Intercepted');
        const copiedReq = req.clone({
            //headers: req.headers.append('', '');
            params: req.params.set('auth', this.authService.getToken())
        });
        return next.handle(copiedReq);
    }


}