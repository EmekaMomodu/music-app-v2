import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Playlist} from "../../../model/playlist.model";

@Component({
    selector: 'app-view-playlist-modal',
    templateUrl: './view-playlist-modal.component.html',
    styleUrls: ['./view-playlist-modal.component.scss']
})
export class ViewPlaylistModalComponent implements OnInit {

    @Input() playlist: Playlist = {};

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

}



