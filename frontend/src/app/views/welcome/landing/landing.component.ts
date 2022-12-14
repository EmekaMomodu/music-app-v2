import {Component} from '@angular/core';
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {Observable, of} from "rxjs";
import {AuthService} from "../../../service/auth.service";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

    isLoggedIn$: Observable<boolean> = of(false);
    faRightToBracket = faRightToBracket;
    isLoggedIn: boolean = false;
    loggedInUser: any;

    constructor(private authService: AuthService) {
        this.isLoggedIn$ = this.authService.isLoggedIn;
        this.loggedInUser = this.authService.user.value;
    }

}
