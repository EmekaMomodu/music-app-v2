import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<any>(null);

}
