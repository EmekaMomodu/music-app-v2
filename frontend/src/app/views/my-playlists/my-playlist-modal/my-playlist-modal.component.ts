import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Track} from "../../../model/track.model";
import {faSquareArrowUpRight} from '@fortawesome/free-solid-svg-icons';
import {faYoutube} from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-my-playlist-modal',
    templateUrl: './my-playlist-modal.component.html',
    styleUrls: ['./my-playlist-modal.component.scss']
})
export class MyPlaylistModalComponent implements OnInit {

    @Input() track: Track = {};

    faSquareArrowUpRight: any = faSquareArrowUpRight;

    faYoutube: any = faYoutube;

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

}



