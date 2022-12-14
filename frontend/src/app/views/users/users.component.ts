import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {PaginateSortService} from "../../util/paginate-sort.service";
import {DecimalPipe} from "@angular/common";
import {SpinnerService} from "../../util/spinner/spinner.service";
import {ToastService} from "../../util/toast/toast.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../service/auth.service";
import {Playlist} from "../../model/playlist.model";
import {PlaylistService} from "../../service/playlist.service";
import {PlaylistModalComponent} from "../playlists/playlist-modal/playlist-modal.component";
import {faArrowsRotate, faEye, faPen, faTrashCan, faBan, faCheck, faX} from '@fortawesome/free-solid-svg-icons';
import {SharedDataService} from "../../service/shared-data.service";
import {UpdateUserModalComponent} from "./update-user-modal/update-user-modal.component";
import {UserService} from "../../service/user.service";
import {DeactivateUserModalComponent} from "./deactivate-user-modal/deactivate-user-modal.component";

@Component({
    selector: 'app-my-playlists',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss'],
    providers: [DecimalPipe, PaginateSortService]
})
export class UsersComponent implements OnInit, OnDestroy {

    user$: Observable<any[]>;
    total$: Observable<number>;

    users: any[] = [];
    user: any = {};

    isError: boolean = false;
    loggedInUser: any;

    faArrowsRotate: any = faArrowsRotate;
    faEye: any = faEye;
    faPen: any = faPen;
    faTrashCan: any = faTrashCan;
    faBan: any = faBan;

    faCheck: any = faCheck;
    faX:any = faX;

    sdsInvokedMethodSubscription: Subscription | undefined;

    constructor(public paginateSortService: PaginateSortService,
                private playlistService: PlaylistService,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private modalService: NgbModal,
                private authService: AuthService,
                private sharedDataService: SharedDataService,
                private userService: UserService) {
        this.getAllUsers(true, false);
        this.user$ = paginateSortService.data$;
        this.total$ = paginateSortService.total$;
        this.loggedInUser = this.authService.user.value;

        this.sdsInvokedMethodSubscription = this.sharedDataService.invokedMethod.subscribe(response => {
            if (response.action === 'getAllUsers') {
                this.getAllUsers(false, false);
            }
        });

    }

    ngOnInit(): void {
    }

    getAllUsers(showSpinner: boolean, showSuccessToast: boolean) {
        if (showSpinner) this.spinnerService.show();
        this.userService.getAllUsers().subscribe({
                next: (response) => {
                    // console.log("response::: " + JSON.stringify(response));
                    if (response.success && response.data && response.data.length) {
                        this.users = response.data;
                        this.paginateSortService.data = this.users;
                        if (showSpinner) this.spinnerService.hide();
                        if (showSuccessToast) this.toastService.showSuccess(response.message);
                    } else {
                        if (showSpinner) this.spinnerService.hide();
                        this.toastService.showError(response.message);
                    }
                },
                error: (error) => {
                    if (showSpinner) this.spinnerService.hide();
                    console.error("error::: " + JSON.stringify(error));
                    this.toastService.showError(error.error?.message || error.message);
                }
            }
        );
    }

    refresh() {
        this.getAllUsers(true, true);
    }

    openUpdateUserModal(user: any) {
        const modalRef = this.modalService.open(UpdateUserModalComponent, {centered: true});
        modalRef.componentInstance.user = user;
    }

    openDeactivateUserModal(user: any) {
        const modalRef = this.modalService.open(DeactivateUserModalComponent, {centered: true});
        modalRef.componentInstance.user = user;
    }

    ngOnDestroy(): void {
        if (this.sdsInvokedMethodSubscription !== undefined) this.sdsInvokedMethodSubscription.unsubscribe();
    }

}
