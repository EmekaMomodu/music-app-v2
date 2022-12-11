import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    show(){
        this.showSpinner.next(true);
    }

    hide(){
        this.showSpinner.next(false);
    }

    get observeShowSpinner() {
        return this.showSpinner.asObservable();
    }

}
