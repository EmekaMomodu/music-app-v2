import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Response} from "../model/response.model";
import {HttpClient} from "@angular/common/http";
import {URLS} from "../util/constants";

@Injectable({
    providedIn: 'root'
})
export class PlaylistService {

    constructor(private httpClient: HttpClient) {
    }

    getAllPublicPlaylistInfo(): Observable<Response> {
        return this.httpClient.get<Response>(URLS.OPEN_PLAYLISTS);
    }

}
