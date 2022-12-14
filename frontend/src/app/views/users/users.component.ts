import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {faMagnifyingGlass, faSort} from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {NgbdSortableHeader, SortEvent} from "../../util/sortable.directive";
import {PaginateSortService} from "../../util/paginate-sort.service";
import {DecimalPipe} from "@angular/common";
import {TrackService} from "../../service/track.service";
import {Track} from "../../model/track.model";
import {SpinnerService} from "../../util/spinner/spinner.service";
import {ToastService} from "../../util/toast/toast.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserModalComponent} from "./user-modal/user-modal.component";

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss'],
    providers: [DecimalPipe, PaginateSortService]
})
export class UsersComponent implements OnInit, OnDestroy {
    faMagnifyingGlass: any = faMagnifyingGlass;
    faSort: any = faSort;

    trackList$: Observable<Track[]>;
    total$: Observable<number>;

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> | undefined;

    searchText: string = '';

    trackList: Track[] = [];

    constructor(public paginateSortService: PaginateSortService,
                private trackService: TrackService,
                private spinnerService: SpinnerService,
                private toastService: ToastService,
                private modalService: NgbModal) {
        this.trackList$ = paginateSortService.data$;
        this.total$ = paginateSortService.total$;
    }

    ngOnInit(): void {
    }

    onSort({column, direction}: SortEvent) {
        // resetting other headers
        this.headers?.forEach((header) => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        this.paginateSortService.sortColumn = column;
        this.paginateSortService.sortDirection = direction;
    }

    searchTracks() {
        this.spinnerService.show();
        const trimmedSearchText = this.searchText.trim();
        this.trackService.searchTracks(trimmedSearchText).subscribe({
                next: (response) => {
                    // console.log("response::: " + JSON.stringify(response));
                    if (response.success && response.data && response.data.length) {
                        this.trackList = <Track[]>response.data;
                        this.paginateSortService.data = this.trackList;
                        this.paginateSortService.searchTerm = trimmedSearchText;
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

    openTrackModal(track: any) {
        const modalRef = this.modalService.open(UserModalComponent, {centered: true});
        modalRef.componentInstance.track = track;
    }

    reset() {
        this.searchText = '';
        this.trackList = [];
        this.paginateSortService.data = [];
        this.paginateSortService.searchTerm = '';
    }

    ngOnDestroy(): void {
    }

}
