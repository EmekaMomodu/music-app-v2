/** code source: https://ng-bootstrap.github.io/releases/13.x/#/components/table/examples#pagination */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';

interface SortPaginateResult {
    data: any[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
    data: any[];
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(data: any[], column: SortColumn, direction: string): any[] {
    if (direction === '' || column === '') {
        return data;
    } else {
        return [...data].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

// function matches(country: Country, term: string, pipe: PipeTransform) {
//     return (
//         country.name.toLowerCase().includes(term.toLowerCase()) ||
//         pipe.transform(country.area).includes(term) ||
//         pipe.transform(country.population).includes(term)
//     );
// }

@Injectable({providedIn: 'root'})
export class PaginateSortService {
    private _sortAndPaginate$ = new Subject<void>();
    private _state: State = {
        page: 1,
        pageSize: 5,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
        data: []
    };

    constructor(private pipe: DecimalPipe) {
        this._sortAndPaginate$
            .pipe(
                tap(() => this._loading$.next(true)),
                // debounceTime(200),
                switchMap(() => this._sortAndPaginate()),
                // delay(200),
                tap(() => this._loading$.next(false)),
            )
            .subscribe((result) => {
                this._data$.next(result.data);
                this._total$.next(result.total);
            });

        this._sortAndPaginate$.next();
    }

    private _loading$ = new BehaviorSubject<boolean>(true);

    get loading$() {
        return this._loading$.asObservable();
    }

    private _data$ = new BehaviorSubject<any[]>([]);

    get data$() {
        return this._data$.asObservable();
    }

    private _total$ = new BehaviorSubject<number>(0);

    get total$() {
        return this._total$.asObservable();
    }

    get page() {
        return this._state.page;
    }

    set page(page: number) {
        this._set({page});
    }

    get pageSize() {
        return this._state.pageSize;
    }

    set pageSize(pageSize: number) {
        this._set({pageSize});
    }

    get searchTerm() {
        return this._state.searchTerm;
    }

    set searchTerm(searchTerm: string) {
        this._set({searchTerm});
    }

    set sortColumn(sortColumn: SortColumn) {
        this._set({sortColumn});
    }

    set sortDirection(sortDirection: SortDirection) {
        this._set({sortDirection});
    }

    set data(data: any[]) {
        this._set({data});
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._sortAndPaginate$.next();
    }

    private _sortAndPaginate(): Observable<SortPaginateResult> {
        const {sortColumn, sortDirection, pageSize, page, searchTerm, data} = this._state;

        // 1. sort
        let dataResult = sort(data, sortColumn, sortDirection);

        // 2. filter
        // countries = countries.filter((country) => matches(country, searchTerm, this.pipe));
        const total = dataResult.length;

        // 3. paginate
        dataResult = dataResult.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({data: dataResult, total});
    }
}
