import {Component, OnDestroy, OnInit} from '@angular/core';
import {faArrowsRotate, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {Observable, throwError} from "rxjs";
import {PaginateSortService} from "../../util/paginate-sort.service";
import {DecimalPipe} from "@angular/common";
import {SpinnerService} from "../../util/spinner/spinner.service";
import {ToastService} from "../../util/toast/toast.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Playlist} from "../../model/playlist.model";
import {PlaylistService} from "../../service/playlist.service";
import {PlaylistModalComponent} from "./playlist-modal/playlist-modal.component";
import {AuthService} from "../../service/auth.service";

@Component({
    selector: 'app-playlists',
    templateUrl: 'playlists.component.html',
    styleUrls: ['playlists.component.scss'],
    providers: [DecimalPipe, PaginateSortService]
})
export class PlaylistsComponent implements OnInit, OnDestroy {

    faArrowsRotate: any = faArrowsRotate;

    playlists$: Observable<Playlist[]>;
    total$: Observable<number>;

    playlists: Playlist[] = [];
    playlist: Playlist = {};

    isError: boolean = false;
    loggedInUser: any;

    constructor(public paginateSortService: PaginateSortService,
                private playlistService: PlaylistService,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private modalService: NgbModal,
                private authService: AuthService) {
        this.getAllPublicPlaylistInfo(true, false);
        this.playlists$ = paginateSortService.data$;
        this.total$ = paginateSortService.total$;
        this.loggedInUser = this.authService.user.value;
    }

    ngOnInit(): void {
    }

    getAllPublicPlaylistInfo(showSpinner: boolean, showSuccessToast: boolean) {
        if (showSpinner) this.spinnerService.show();
        this.playlistService.getAllPublicPlaylistInfo().subscribe({
                next: (response) => {
                    // console.log("response::: " + JSON.stringify(response));
                    if (response.success && response.data && response.data.length) {
                        this.playlists = <Playlist[]>response.data;
                        this.paginateSortService.pageSize = 10;
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

    openPlaylistModal(playlistId: any) {
        this.spinnerService.show();
        if(this.loggedInUser && this.loggedInUser?.role === 'ADMIN'){
            this.playlistService.getPublicPlaylistByIdForAdmin(playlistId).subscribe({
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
                            const modalRef = this.modalService.open(PlaylistModalComponent, {centered: true,
                                size: 'xl',
                                // scrollable: true
                            });
                            modalRef.componentInstance.playlist = this.playlist;
                        }
                        this.isError = false;
                    }
                }
            );
        } else {
            this.playlistService.getPublicPlaylistById(playlistId).subscribe({
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
                            const modalRef = this.modalService.open(PlaylistModalComponent, {centered: true,
                                size: 'xl',
                                // scrollable: true
                            });
                            modalRef.componentInstance.playlist = this.playlist;
                        }
                        this.isError = false;
                    }
                }
            );
        }
    }

    refresh() {
        this.getAllPublicPlaylistInfo(true, true);
    }

    ngOnDestroy(): void {
        this.toastService.clear();
    }

}
