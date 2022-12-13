import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        return this.authService.admin.pipe(
            take(1),
            map(admin => {
                if (admin) {
                    return true;
                }
                return this.router.createUrlTree(['/welcome']);
            })
        );
    }

}
