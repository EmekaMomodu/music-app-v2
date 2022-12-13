import {Component} from '@angular/core';
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

    faRightToBracket = faRightToBracket;
    isLoggedIn: boolean = false;

    constructor() {
    }

}
