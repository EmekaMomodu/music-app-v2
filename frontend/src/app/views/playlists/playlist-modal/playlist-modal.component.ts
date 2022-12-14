import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faAngleUp, faSquareArrowUpRight, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {Playlist} from "../../../model/playlist.model";
import {TrackModalComponent} from "../../tracks/track-modal/track-modal.component";
import {AuthService} from "../../../service/auth.service";
import {Observable, of, Subscription} from "rxjs";
import {HideReviewModalComponent} from "../hide-review-modal/hide-review-modal.component";
import {SharedDataService} from "../../../service/shared-data.service";
import {AddReviewModalComponent} from "../add-review-modal/add-review-modal.component";

@Component({
    selector: 'app-playlist-modal',
    templateUrl: './playlist-modal.component.html',
    styleUrls: ['./playlist-modal.component.scss']
})
export class PlaylistModalComponent implements OnInit, OnDestroy {

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

    sdsInvokedMethodSubscription: Subscription | undefined;

    collapses = [false, false];

    constructor(public activeModal: NgbActiveModal,
                private modalService: NgbModal,
                private authService: AuthService,
                private sharedDataService: SharedDataService) {
        this.isLoggedIn$ = this.authService.isLoggedIn;
        this.isAdmin$ = this.authService.isAdmin;
        this.loggedInUser = this.authService.user.value;

        this.sdsInvokedMethodSubscription = this.sharedDataService.invokedMethod.subscribe(response => {
            if (response.action === 'updatePlaylist') {
                this.playlist = response.data;
            }
        });

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

    openHideReviewModal(playlist: any, review: any) {
        const modalRef = this.modalService.open(HideReviewModalComponent, {centered: true, size: 'sm'});
        modalRef.componentInstance.playlist = playlist;
        modalRef.componentInstance.review = review;
    }

    openAddReviewModal() {
        const modalRef = this.modalService.open(AddReviewModalComponent, {centered: true});
        modalRef.componentInstance.playlist = this.playlist;
    }

    ngOnDestroy(): void {
        if (this.sdsInvokedMethodSubscription !== undefined) this.sdsInvokedMethodSubscription.unsubscribe();
    }
}



