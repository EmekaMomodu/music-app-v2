import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Response} from "../model/response.model";
import {HttpClient} from "@angular/common/http";
import {MAX_NO_OF_RECORDS, URLS} from "../util/constants";

@Injectable({
    providedIn: 'root'
})
export class TrackService {

    constructor(private httpClient: HttpClient) {
    }

    searchTracks(searchText: string): Observable<Response> {
        return this.httpClient.get<Response>(
            URLS.TRACKS,
            {
                params: {
                    searchText: searchText,
                    maxNoOfRecords: MAX_NO_OF_RECORDS
                }
            });
    }
}
