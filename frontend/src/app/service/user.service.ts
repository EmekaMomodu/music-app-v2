import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Response} from "../model/response.model";
import {HttpClient} from "@angular/common/http";
import {MAX_NO_OF_RECORDS, URLS} from "../util/constants";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) {
    }

    getAllUsers(): Observable<Response> {
        return this.httpClient.get<Response>(URLS.ADMIN_USERS);
    }

    updateUserRoleOrStatus(user: any): Observable<Response> {
        return this.httpClient.put<Response>(
            URLS.ADMIN_USERS,
            user
            );
    }

    updateUserPassword(user: any): Observable<Response> {
        return this.httpClient.put<Response>(
            URLS.SECURE_USERS,
            user
        );
    }
}
