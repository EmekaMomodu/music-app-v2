import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Playlist} from "../../../model/playlist.model";
import {SharedDataService} from "../../../service/shared-data.service";
import {PlaylistService} from "../../../service/playlist.service";
import {SpinnerService} from "../../../util/spinner/spinner.service";
import {ToastService} from "../../../util/toast/toast.service";
import {FormControl, NgForm} from "@angular/forms";
import {Track} from "../../../model/track.model";
import {faArrowsRotate, faEye, faPen, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {TrackService} from "../../../service/track.service";
import {UserService} from "../../../service/user.service";
import {AuthService} from "../../../service/auth.service";

@Component({
    selector: 'app-create-playlist-modal',
    templateUrl: './update-password-modal.component.html',
    styleUrls: ['./update-password-modal.component.scss']
})
export class UpdatePasswordModalComponent implements OnInit {

    @Input() user: any = {};
    isInvalid: boolean = false;

    constructor(public activeModal: NgbActiveModal,
                private userService: UserService,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private authService: AuthService,
                private sharedDataService: SharedDataService,
                private trackService: TrackService) {
    }

    ngOnInit(): void {
    }

    updateUserPassword(ngForm: NgForm) {
        console.log(JSON.stringify(ngForm.value));
        if (ngForm.invalid) {
            this.isInvalid = true;
            return;
        }
        const updatedUser = ngForm.value;
        updatedUser.id = this.user.id;
        console.log(JSON.stringify(updatedUser));
        this.spinnerService.show();
        this.userService.updateUserPassword(
            updatedUser
        ).subscribe({
                next: (response) => {
                    if (response.success && response.data) {
                        this.activeModal.close();
                        this.spinnerService.hide();
                        this.authService.logout();
                        this.toastService.showSuccess("Password Updated, Kindly log back in");

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

    ngOnDestroy(): void {
    }

}



