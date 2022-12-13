import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faAngleUp, faSquareArrowUpRight, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {Playlist} from "../../../model/playlist.model";
import {TrackModalComponent} from "../../tracks/track-modal/track-modal.component";
import {AuthService} from "../../../service/auth.service";
import {Observable, of} from "rxjs";

@Component({
    selector: 'app-playlist-modal',
    templateUrl: './playlist-modal.component.html',
    styleUrls: ['./playlist-modal.component.scss']
})
export class PlaylistModalComponent implements OnInit {

    @Input() playlist: Playlist = {};
    
    faAngleDownOrUpTracks: any = faAngleUp;
    faAngleDownOrUpReviews: any = faAngleUp;
    expandOrCollapseTracks: string = 'Expand';
    expandOrCollapseReviews: string = 'Expand';
    countToggleTracksButtonClicks: number = 0;
    countToggleReviewsButtonClicks: number = 0;
    isLoggedIn$: Observable<boolean> = of(false);
    isAdmin$: Observable<boolean> = of(false);
    loggedInUser: any;


    collapses = [false, false];

    constructor(public activeModal: NgbActiveModal,
                private modalService: NgbModal,
                private authService: AuthService) {
        this.isLoggedIn$ = this.authService.isLoggedIn;
        this.isAdmin$ = this.authService.isAdmin;
        this.loggedInUser = this.authService.user.value;
    }

    ngOnInit(): void {
    }

    toggleTracksButton(id: number) {
        this.countToggleTracksButtonClicks += 1;
        if(this.countToggleTracksButtonClicks % 2 === 0) { this.expandOrCollapseTracks = 'Expand'; this.faAngleDownOrUpTracks = faAngleUp;}
        else {this.expandOrCollapseTracks = 'Collapse'; this.faAngleDownOrUpTracks = faAngleDown; }
        this.collapses[id] = !this.collapses[id];
    }

    toggleReviewsButton(id: number) {
        this.countToggleReviewsButtonClicks += 1;
        if(this.countToggleReviewsButtonClicks % 2 === 0) { this.expandOrCollapseReviews = 'Expand'; this.faAngleDownOrUpReviews = faAngleUp;}
        else {this.expandOrCollapseReviews = 'Collapse'; this.faAngleDownOrUpReviews = faAngleDown; }
        this.collapses[id] = !this.collapses[id];
    }

    openTrackModal(track: any) {
        const modalRef = this.modalService.open(TrackModalComponent, {centered: true});
        modalRef.componentInstance.track = track;
    }

}



