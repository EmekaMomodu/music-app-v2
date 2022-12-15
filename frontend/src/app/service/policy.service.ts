import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Response} from "../model/response.model";
import {HttpClient} from "@angular/common/http";
import {MAX_NO_OF_RECORDS, URLS} from "../util/constants";

@Injectable({
    providedIn: 'root'
})
export class PolicyService {

    securityUrl = new BehaviorSubject<any>(null);
    aupUrl = new BehaviorSubject<any>(null);
    dmcaUrl = new BehaviorSubject<any>(null);

    constructor(private httpClient: HttpClient) {
    }

    uploadSecurityPolicy(url: any) {
        return this.httpClient.post<Response>(
            URLS.ADMIN_POLICY_SECURITY,
            url
        );
    }

    uploadAup(url: any) {
        return this.httpClient.post<Response>(
            URLS.ADMIN_POLICY_AUP,
            url
        );
    }

    uploadDmca(url: any) {
        return this.httpClient.post<Response>(
            URLS.ADMIN_POLICY_DMCA,
            url
        );
    }

}
