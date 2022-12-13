import {Component, Input} from '@angular/core';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import {ClassToggleService, HeaderComponent} from '@coreui/angular';

@Component({
    selector: 'app-default-header',
    templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

    @Input() sidebarId: string = "sidebar";

    public newMessages = new Array(4)
    public newTasks = new Array(5)
    public newNotifications = new Array(5)
    isLoggedIn: boolean = false;
    username: any = 'Emeka';
    isAdmin: boolean = true;
    faUser: any = faUser;
    faRightFromBracket: any = faRightFromBracket;

    constructor(private classToggler: ClassToggleService) {
        super();
    }
}
