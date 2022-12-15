import {Component} from '@angular/core';
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {Observable, of} from "rxjs";
import {AuthService} from "../../../service/auth.service";
import {UserService} from "../../../service/user.service";
import {AuthRequest} from "../../../model/auth-request.model";
import {SpinnerService} from "../../../util/spinner/spinner.service";
import {ToastService} from "../../../util/toast/toast.service";
import {User} from "../../../model/user.model";
import {PlaylistModalComponent} from "../../playlists/playlist-modal/playlist-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
    EmailVerificationSuccessModalComponent
} from "../email-verification-success-modal/email-verification-success-modal.component";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

    isLoggedIn$: Observable<boolean> = of(false);
    isEmailVerified$: Observable<boolean> = of(false);
    faRightToBracket = faRightToBracket;
    isLoggedIn: boolean = false;
    loggedInUser: any;

    constructor(private authService: AuthService,
                private userService: UserService,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private modalService: NgbModal,) {
        this.isLoggedIn$ = this.authService.isLoggedIn;
        this.isEmailVerified$ = this.authService.isEmailVerified;
        this.loggedInUser = this.authService.user.value;
    }

    verifyEmail() {
        this.spinnerService.show();
        this.userService.updateUserEmailVerification().subscribe({
                next: (response) => {
                    // console.log("response::: " + JSON.stringify(response));
                    if (response.success && response.data) {
                        // update user in local storage and behaviour subject with response
                        const userData: any = JSON.parse(localStorage.getItem('userData') || '""');
                        if (!userData) {
                            return;
                        }
                        userData.emailVerifiedFlag = response.data.emailVerifiedFlag;
                        localStorage.setItem('userData', JSON.stringify(userData));
                        this.authService.autoLogin();
                        this.spinnerService.hide();
                        // display success modal
                        this.modalService.open(EmailVerificationSuccessModalComponent, {centered: true,
                            // size: 'sm'
                        });

                        // this.spinnerService.hide();
                        // this.toastService.showSuccess(response.message);
                    } else {
                        this.spinnerService.hide();
                        this.toastService.showError(response.message);
                    }
                },
                error: (error) => {
                    this.spinnerService.hide();
                    console.error("error::: " + JSON.stringify(error));
                    this.toastService.showError(error.error?.message || error.message);
                }
            }
        );


    }
}
