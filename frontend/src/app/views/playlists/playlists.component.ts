import {Component, OnDestroy, OnInit} from '@angular/core';
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {PaginateSortService} from "../../util/paginate-sort.service";
import {DecimalPipe} from "@angular/common";
import {SpinnerService} from "../../util/spinner/spinner.service";
import {ToastService} from "../../util/toast/toast.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PlaylistModalComponent} from "./playlist-modal/playlist-modal.component";
import {Playlist} from "../../model/playlist.model";
import {PlaylistService} from "../../service/playlist.service";

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

    constructor(public paginateSortService: PaginateSortService,
                private playlistService: PlaylistService,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private modalService: NgbModal) {
        this.playlists$ = paginateSortService.data$;
        this.total$ = paginateSortService.total$;
    }

    ngOnInit(): void {
        this.getAllPublicPlaylistInfo();
    }

    getAllPublicPlaylistInfo() {
        this.spinnerService.show();
        this.playlistService.getAllPublicPlaylistInfo().subscribe({
                next: (response) => {
                    // console.log("response::: " + JSON.stringify(response));
                    if (response.success && response.data && response.data.length) {
                        this.playlists = <Playlist[]>response.data;
                        this.paginateSortService.pageSize = 10;
                        this.paginateSortService.data = this.playlists;
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

    openPlaylistModal(track: any) {
        const modalRef = this.modalService.open(PlaylistModalComponent, {centered: true});
        modalRef.componentInstance.track = track;
    }

    refresh() {
        this.getAllPublicPlaylistInfo();
    }

    ngOnDestroy(): void {
        this.toastService.clear();
    }

}
