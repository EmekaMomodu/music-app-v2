import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Playlist} from "../../../model/playlist.model";
import {SpinnerService} from "../../../util/spinner/spinner.service";
import {ToastService} from "../../../util/toast/toast.service";
import {PlaylistService} from "../../../service/playlist.service";
import {SharedDataService} from "../../../service/shared-data.service";

@Component({
    selector: 'app-update-user-modal',
    templateUrl: './security-policy.component.html',
    styleUrls: ['./seccurity-policy.component.scss']
})
export class SecurityPolicyComponent implements OnInit {

    @Input() playlist: Playlist = {};

    constructor(public activeModal: NgbActiveModal,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private playlistService: PlaylistService,
                private sharedDataService: SharedDataService) {
    }

    ngOnInit(): void {
    }

    deletePlaylist(id: any) {
        this.spinnerService.show();
        this.playlistService.deletePlaylistById(
            id
        ).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.sharedDataService.invokeExternalMethod('getAllPlaylistInfo', undefined);
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



