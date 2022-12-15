import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SpinnerService} from "../../util/spinner/spinner.service";
import {ToastService} from "../../util/toast/toast.service";
import {Playlist} from "../../model/playlist.model";
import {PolicyService} from "../../service/policy.service";

@Component({
    selector: 'app-update-user-modal',
    templateUrl: './policies.component.html',
    styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

    @Input() playlist: Playlist = {};
    securityPolicyUrl: any;
    aupUrl: any;
    dmcaUrl: any;

    constructor(
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private policyService: PolicyService) {
    }

    ngOnInit(): void {
    }

    deletePlaylist(id: any) {
        // this.spinnerService.show();
        // this.playlistService.deletePlaylistById(
        //     id
        // ).subscribe({
        //         next: (response) => {
        //             if (response.success) {
        //                 this.sharedDataService.invokeExternalMethod('getAllPlaylistInfo', undefined);
        //                 this.activeModal.close();
        //                 this.spinnerService.hide();
        //                 this.toastService.showSuccess(response.message);
        //             } else {
        //                 this.spinnerService.hide();
        //                 this.toastService.showError(response.message);
        //             }
        //         },
        //         error: (error) => {
        //             this.spinnerService.hide();
        //             console.error("error::: " + JSON.stringify(error));
        //             this.toastService.showError(error.error?.message || error.message);
        //         }
        //     }
        // );
    }

    uploadSecurityPolicy() {
        console.log(JSON.stringify(this.securityPolicyUrl));

        // this.spinnerService.show();
        // this.policyService.uploadSecurityPolicy(
        //     {url: this.securityPolicyUrl}
        // ).subscribe({
        //         next: (response) => {
        //             if (response.success) {
        //                 this.sharedDataService.invokeExternalMethod('getAllPlaylistInfo', undefined);
        //                 this.activeModal.close();
        //                 this.spinnerService.hide();
        //                 this.toastService.showSuccess(response.message);
        //             } else {
        //                 this.spinnerService.hide();
        //                 this.toastService.showError(response.message);
        //             }
        //         },
        //         error: (error) => {
        //             this.spinnerService.hide();
        //             console.error("error::: " + JSON.stringify(error));
        //             this.toastService.showError(error.error?.message || error.message);
        //         }
        //     }
        // );

        this.securityPolicyUrl = undefined;
    }

    uploadAup() {
        console.log(JSON.stringify(this.aupUrl));
        this.aupUrl = undefined;
    }

    uploadDmca() {
        console.log(JSON.stringify(this.dmcaUrl));
        this.dmcaUrl = undefined;
    }
}



