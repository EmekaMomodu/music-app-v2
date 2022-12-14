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

    getPublicPlaylistById(id: string): Observable<Response> {
        return this.httpClient.get<Response>(URLS.OPEN_PLAYLISTS + '/' + id);
    }

    getPublicPlaylistByIdForAdmin(id: string): Observable<Response> {
        return this.httpClient.get<Response>(URLS.ADMIN_PLAYLISTS + '/' + id);
    }

    updatePlaylistReviewHiddenFlag(playlistId: any, reviewId: any, hiddenFlag: any) : Observable<Response> {
        return  this.httpClient.put<Response> (
            URLS.ADMIN_PLAYLISTS_REVIEWS,
            {
                playlistId: playlistId,
                reviewId: reviewId,
                hiddenFlag: hiddenFlag
            }
        );
    }

}
