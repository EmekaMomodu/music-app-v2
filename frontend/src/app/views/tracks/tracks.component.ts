import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {NgbdSortableHeader, SortEvent} from "../../util/sortable.directive";
import {PaginateSortService} from "../../util/paginate-sort.service";
import {DecimalPipe} from "@angular/common";
import {TrackService} from "../../service/track.service";
import {Track} from "../../model/track.model";
import {SpinnerService} from "../../util/spinner/spinner.service";
import {ToastService} from "../../util/toast/toast.service";

@Component({
    templateUrl: 'tracks.component.html',
    styleUrls: ['tracks.component.scss'],
    providers: [DecimalPipe, PaginateSortService]
})
export class TracksComponent implements OnInit, OnDestroy {
    faMagnifyingGlass: any = faMagnifyingGlass;

    trackList$: Observable<Track[]>;
    total$: Observable<number>;

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> | undefined;

    searchText: string = '';

    trackList: Track[] = [];

    constructor(public paginateSortService: PaginateSortService,
                private trackService: TrackService,
                private spinnerService: SpinnerService,
                private toastService: ToastService) {
        this.trackList$ = paginateSortService.data$;
        this.total$ = paginateSortService.total$;
    }

    ngOnInit(): void {
    }

    onSort({ column, direction }: SortEvent) {
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
        this.trackService.searchTracks(this.searchText).subscribe({
            next: (response) => {
                // console.log("response::: " + JSON.stringify(response));
                if (response.success && response.data && response.data.length) {
                    this.trackList = <Track[]>response.data;
                    this.paginateSortService.data = this.trackList;
                    this.spinnerService.hide();
                    this.toastService.showSuccess(response.message);
                } else {
                    this.spinnerService.hide();
                    this.toastService.showError(response.message);
                }
            },
            error: (error) => {
                console.error("error::: " + JSON.stringify(error));
                this.spinnerService.hide();
                this.toastService.showError(error.name + ": " + error.error.message);
            }}
        );
    }

    reset() {
        this.searchText = '';
        this.trackList = [];
        this.paginateSortService.data = [];
    }

    ngOnDestroy(): void {
        this.toastService.clear();
    }

}
