import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Playlist} from "../../../model/playlist.model";
import {Review} from "../../../model/review.model";
import {PlaylistService} from "../../../service/playlist.service";
import {SpinnerService} from "../../../util/spinner/spinner.service";
import {ToastService} from "../../../util/toast/toast.service";
import {SharedDataService} from "../../../service/shared-data.service";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-add-review-modal',
    templateUrl: './add-review-modal.component.html',
    styleUrls: ['./add-review-modal.component.scss']
})
export class AddReviewModalComponent implements OnInit, OnDestroy {

    @Input() playlist: Playlist = {};

    constructor(public activeModal: NgbActiveModal,
                private playlistService: PlaylistService,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private sharedDataService: SharedDataService) {
    }

    isInvalid = false;

    ngOnInit(): void {
    }

    createReviewForPublicPlaylist(ngForm: NgForm) {
        console.log(JSON.stringify(ngForm.value));
        if (ngForm.invalid) {
            this.isInvalid = true;
            return;
        }
        this.spinnerService.show();
        this.playlistService.createReviewForPublicPlaylist(
            this.playlist.id,
            ngForm.value.rating,
            ngForm.value.comment,
            ).subscribe({
                next: (response) => {
                    if (response.success && response.data) {
                        this.sharedDataService.invokeExternalMethod('updatePlaylistAndCollapse', response.data);
                        // getAllPublicPlaylistInfo
                        this.sharedDataService.invokeExternalMethod('getAllPublicPlaylistInfo', undefined);
                        this.spinnerService.hide();
                        this.activeModal.close();
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

    ngOnDestroy(): void {
    }

}



