import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Playlist} from "../../../model/playlist.model";
import {Review} from "../../../model/review.model";
import {PlaylistService} from "../../../service/playlist.service";
import {SpinnerService} from "../../../util/spinner/spinner.service";
import {ToastService} from "../../../util/toast/toast.service";
import {SharedDataService} from "../../../service/shared-data.service";

@Component({
    selector: 'app-playlist-modal',
    templateUrl: './hide-review-modal.component.html',
    styleUrls: ['./hide-review-modal.component.scss']
})
export class HideReviewModalComponent implements OnInit, OnDestroy {

    @Input() playlist: Playlist = {};
    @Input() review: Review = {};

    constructor(public activeModal: NgbActiveModal,
                private playlistService: PlaylistService,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private sharedDataService: SharedDataService) {
    }

    ngOnInit(): void {
    }

    updatePlaylistReviewHiddenFlag() {
        this.spinnerService.show();
        const hiddenFlag = this.review.hiddenFlag === 'N' ? 'Y' : 'N';
        this.playlistService.updatePlaylistReviewHiddenFlag(
            this.playlist.id,
            this.review.id,
            hiddenFlag
            ).subscribe({
                next: (response) => {
                    if (response.success && response.data) {
                        this.sharedDataService.invokeExternalMethod('updatePlaylist', response.data);
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



