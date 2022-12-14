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

    createReviewForPublicPlaylist(playlistId: any, rating: number, comment: string) : Observable<Response> {
        return  this.httpClient.post<Response> (
            URLS.SECURE_PLAYLISTS_REVIEWS,
            {
                playlistId: playlistId,
                rating: rating,
                comment: comment
            }
        );
    }

    getAllPlaylistInfo(): Observable<Response> {
        return this.httpClient.get<Response>(URLS.SECURE_PLAYLISTS);
    }

    createPlaylist(playlist: any) : Observable<Response> {
        return  this.httpClient.post<Response> (
            URLS.SECURE_PLAYLISTS,
            playlist
        );
    }

    getPlaylistById(id: string): Observable<Response> {
        return this.httpClient.get<Response>(URLS.SECURE_PLAYLISTS + '/' + id);
    }

    updatePlaylist(playlist: any) : Observable<Response> {
        return  this.httpClient.put<Response> (
            URLS.SECURE_PLAYLISTS,
            playlist
        );
    }

}
