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
import {faArrowsRotate, faEye, faPen, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {CreatePlaylistModalComponent} from "./create-playlist-modal/create-playlist-modal.component";
import {SharedDataService} from "../../service/shared-data.service";
import {ViewPlaylistModalComponent} from "./view-playlist-modal/view-playlist-modal.component";
import {EditPlaylistModalComponent} from "./edit-playlist-modal/edit-playlist-modal.component";

@Component({
    selector: 'app-my-playlists',
    templateUrl: 'my-playlists.component.html',
    styleUrls: ['my-playlists.component.scss'],
    providers: [DecimalPipe, PaginateSortService]
})
export class MyPlaylistsComponent implements OnInit, OnDestroy {

    playlists$: Observable<Playlist[]>;
    total$: Observable<number>;

    playlists: Playlist[] = [];
    playlist: Playlist = {};

    isError: boolean = false;
    loggedInUser: any;

    faArrowsRotate: any = faArrowsRotate;
    faEye: any = faEye;
    faPen: any = faPen;
    faTrashCan: any = faTrashCan;

    sdsInvokedMethodSubscription: Subscription | undefined;

    constructor(public paginateSortService: PaginateSortService,
                private playlistService: PlaylistService,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private modalService: NgbModal,
                private authService: AuthService,
                private sharedDataService: SharedDataService) {
        this.getAllPlaylistInfo(true, false);
        this.playlists$ = paginateSortService.data$;
        this.total$ = paginateSortService.total$;
        this.loggedInUser = this.authService.user.value;

        this.sdsInvokedMethodSubscription = this.sharedDataService.invokedMethod.subscribe(response => {
            if (response.action === 'getAllPlaylistInfo') {
                this.getAllPlaylistInfo(false, false);
            }
        });

    }

    ngOnInit(): void {
    }

    getAllPlaylistInfo(showSpinner: boolean, showSuccessToast: boolean) {
        if (showSpinner) this.spinnerService.show();
        this.playlistService.getAllPlaylistInfo().subscribe({
                next: (response) => {
                    // console.log("response::: " + JSON.stringify(response));
                    if (response.success && response.data && response.data.length) {
                        this.playlists = <Playlist[]>response.data;
                        this.paginateSortService.pageSize = 20;
                        this.paginateSortService.data = this.playlists;
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

    openPlaylistModal(playlistId: any, action: any) {
        this.spinnerService.show();
        this.playlistService.getPlaylistById(playlistId).subscribe({
                next: (response) => {
                    // console.log("response::: " + JSON.stringify(response));
                    if (response.success && response.data) {
                        this.playlist = <Playlist>response.data;
                        this.spinnerService.hide();
                    } else {
                        this.isError = true;
                        this.spinnerService.hide();
                        this.toastService.showError(response.message);
                    }
                },
                error: (error) => {
                    this.spinnerService.hide();
                    console.error("error::: " + JSON.stringify(error));
                    this.toastService.showError(error.error?.message || error.message);
                },
                complete: () => {
                    if(!this.isError) {
                        if(action === 'VIEW') {
                            const modalRef = this.modalService.open(ViewPlaylistModalComponent, {centered: true,});
                            modalRef.componentInstance.playlist = this.playlist;
                        } else if(action === 'EDIT') {
                            const modalRef = this.modalService.open(EditPlaylistModalComponent, {centered: true,});
                            modalRef.componentInstance.playlist = this.playlist;
                        }
                    }
                    this.isError = false;
                }
            }
        );
    }

    refresh() {
        this.getAllPlaylistInfo(true, true);
    }

    openCreatePlaylistModal() {
        this.modalService.open(CreatePlaylistModalComponent, {centered: true,});
    }

    openDeletePlaylistModal(playlist: any) {

    }

    ngOnDestroy(): void {
        if (this.sdsInvokedMethodSubscription !== undefined) this.sdsInvokedMethodSubscription.unsubscribe();
    }

}
