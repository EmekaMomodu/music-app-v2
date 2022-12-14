import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {TOKEN_VALIDITY_PERIOD_IN_SECONDS, URLS} from "../util/constants";
import {AuthRequest} from "../model/auth-request.model";
import {Response} from "../model/response.model";
import {AuthResponseData} from "../model/auth-response-data.model";
import {User} from "../model/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<any>(null);
    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private tokenExpirationTimer: any;

    constructor(private httpClient: HttpClient,
                private router: Router) {
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    get isAdmin() {
        return this.admin.asObservable();
    }

    login(authRequest: AuthRequest): Observable<Response> {
        return this.httpClient.post<Response>(URLS.AUTH, authRequest)
            .pipe(
                tap(authResponse => {
                    if (authResponse.success) {
                        const authData: any = authResponse.data;
                        this.handleAuthenticationSuccess(authData);
                    }
                })
            );
    }

    autoLogin() {
        const userData: any = JSON.parse(localStorage.getItem('userData') || '""');

        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.id,
            userData.name,
            userData.email,
            userData.role,
            userData.status,
            userData.emailVerifiedFlag,
            userData._token,
            new Date(userData._tokenExpirationDate),
            userData.type
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            this.loggedIn.next(true);
            if(loadedUser.role === 'ADMIN') this.admin.next(true);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.loggedIn.next(false);
        this.admin.next(false);
        this.router.navigate(['/welcome']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthenticationSuccess(authData: AuthResponseData) {

        const tokenExpirationDate = new Date(new Date().getTime() + TOKEN_VALIDITY_PERIOD_IN_SECONDS * 1000);

        const user = new User(
            authData.id,
            authData.name,
            authData.email,
            authData.role,
            authData.status,
            authData.emailVerifiedFlag,
            authData.token,
            tokenExpirationDate,
            authData.type
        );
        this.user.next(user);
        this.autoLogout(TOKEN_VALIDITY_PERIOD_IN_SECONDS * 1000);
        const userData: string = JSON.stringify(user);
        localStorage.setItem('userData', userData);
    }

}
