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

@Component({
    selector: 'app-deactivate-user-modal',
    templateUrl: './edit-playlist-modal.component.html',
    styleUrls: ['./edit-playlist-modal.component.scss']
})
export class EditPlaylistModalComponent implements OnInit {

    @Input() playlist: Playlist = {};

    constructor(public activeModal: NgbActiveModal,
                private playlistService: PlaylistService,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private sharedDataService: SharedDataService,
                private trackService: TrackService) {
    }

    isInvalid = false;

    visibility = 'PRIVATE';

    keyword = 'title';

    selectedTracks: Track[] | undefined = [];

    tracks: Track[] = [];

    faTrashCan: any = faTrashCan;

    @ViewChild('auto') auto: any;


    selectEvent(item: any) {
        // do something with selected item
        let duplicate = false
        this.selectedTracks?.forEach((track) => {
            if(item.id === track.id) duplicate = true;
        })
        if(!duplicate){
            this.selectedTracks?.push(item);
        }
        this.auto.clear();
    }

    onChangeSearch(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
        if(search.trim()) this.searchTracks(search);
    }

    onFocused(e: any) {
        // do something
    }

    removeSelectedTrack(index: number){
        this.selectedTracks?.splice(index, 1);
    }

    customFilter = (items: any) => items
    isLoading: boolean = false;

    searchTracks(searchText: string) {
        this.isLoading = true;
        const trimmedSearchText = searchText.trim();
        this.trackService.searchTracks(trimmedSearchText).subscribe({
                next: (response) => {
                    // console.log("response::: " + JSON.stringify(response));
                    if (response.success && response.data && response.data.length) {
                        this.tracks = <Track[]>response.data;
                    }
                    this.isLoading = false;
                },
                error: (error) => {
                    this.isLoading = false;
                    console.error("error::: " + JSON.stringify(error));
                    // this.toastService.showError(error.error?.message || error.message);
                }
            }
        );
    }


    ngOnInit(): void {
        this.selectedTracks = this.playlist.tracks;
    }

    updatePlaylist(ngForm: NgForm) {
        console.log(JSON.stringify(ngForm.value));
        if (ngForm.invalid) {
            this.isInvalid = true;
            return;
        }
        if(!this.selectedTracks?.length){
            this.toastService.showError("Please select a track");
            return;
        }
        const updatedPlaylist = ngForm.value;
        updatedPlaylist.trackIds = this.selectedTracks.map((track) => {
            return Number(track.id);
        });
        updatedPlaylist.id = this.playlist.id;
        this.spinnerService.show();
        this.playlistService.updatePlaylist(
            updatedPlaylist
        ).subscribe({
                next: (response) => {
                    if (response.success && response.data) {
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



