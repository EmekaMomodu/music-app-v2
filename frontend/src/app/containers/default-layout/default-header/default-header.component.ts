import {Component, Input, OnInit} from '@angular/core';
import {faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';

import {ClassToggleService, HeaderComponent} from '@coreui/angular';
import {Observable, of} from "rxjs";
import {AuthService} from "../../../service/auth.service";
import {
    CreatePlaylistModalComponent
} from "../../../views/my-playlists/create-playlist-modal/create-playlist-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
    UpdatePasswordModalComponent
} from "../../../views/my-playlists/update-password-modal/update-password-modal.component";

@Component({
    selector: 'app-default-header',
    templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

    @Input() sidebarId: string = "sidebar";

    isLoggedIn$: Observable<boolean> = of(false);
    isAdmin$: Observable<boolean> = of(false);
    loggedInUser: any;
    faUser: any = faUser;
    faRightFromBracket: any = faRightFromBracket;

    constructor(private classToggler: ClassToggleService,
                private authService: AuthService,
                private modalService: NgbModal,) {
        super();
        this.isLoggedIn$ = this.authService.isLoggedIn;
        this.isAdmin$ = this.authService.isAdmin;
        this.loggedInUser = this.authService.user.value;
    }

    ngOnInit(): void {
    }


    logout() {
        this.authService.logout();
    }

    openUpdatePasswordModal() {
        const modalRef = this.modalService.open(UpdatePasswordModalComponent, {centered: true,});
        modalRef.componentInstance.user = this.loggedInUser;
    }
}
