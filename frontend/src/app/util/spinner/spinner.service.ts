import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get observeShowSpinner() {
        return this.showSpinner.asObservable();
    }

    show() {
        this.showSpinner.next(true);
    }

    hide() {
        this.showSpinner.next(false);
    }

}
