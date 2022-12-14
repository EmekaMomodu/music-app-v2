import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Playlist} from "../../../model/playlist.model";
import {SpinnerService} from "../../../util/spinner/spinner.service";
import {ToastService} from "../../../util/toast/toast.service";
import {PlaylistService} from "../../../service/playlist.service";
import {SharedDataService} from "../../../service/shared-data.service";
import {UserService} from "../../../service/user.service";

@Component({
    selector: 'app-update-user-modal',
    templateUrl: './update-user-modal.component.html',
    styleUrls: ['./update-user-modal.component.scss']
})
export class UpdateUserModalComponent implements OnInit {

    @Input() user: any = {};
    userRole: any;

    constructor(public activeModal: NgbActiveModal,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private userService: UserService,
                private sharedDataService: SharedDataService) {
    }

    ngOnInit(): void {
        this.userRole = this.user.role;
    }

    updateUserRole(id: any) {
        this.spinnerService.show();
        const updatedUser = {
            id: this.user.id,
            role: this.userRole
        }
        this.userService.updateUserRoleOrStatus(
            updatedUser
        ).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.sharedDataService.invokeExternalMethod('getAllUsers', undefined);
                        this.activeModal.close();
                        this.spinnerService.hide();
                        this.toastService.showSuccess(response.message);
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



