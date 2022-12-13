import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {NgbdSortableHeader, SortEvent} from "../../util/sortable.directive";
import {PaginateSortService} from "../../service/paginate-sort.service";
import {DecimalPipe} from "@angular/common";

@Component({
    templateUrl: 'tracks.component.html',
    styleUrls: ['tracks.component.scss'],
    providers: [DecimalPipe, PaginateSortService]
})
export class TracksComponent implements OnInit {
    faMagnifyingGlass: any = faMagnifyingGlass;

    countries$: Observable<any[]>;
    total$: Observable<number>;

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> | undefined;

    constructor(public paginateSortService: PaginateSortService) {
        this.countries$ = paginateSortService.countries$;
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
}
