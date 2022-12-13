import {Component, OnInit} from '@angular/core';

import {navItems} from './_nav';
import {Observable} from "rxjs";
import {SpinnerService} from "../../util/spinner/spinner.service";

@Component({
    selector: 'app-landing',
    templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {

    public navItems = navItems;

    public perfectScrollbarConfig = {
        suppressScrollX: true,
    };

    showSpinner$: Observable<boolean> | undefined;

    constructor(private spinnerService: SpinnerService) {
    }

    ngOnInit(): void {
        this.showSpinner$ = this.spinnerService.observeShowSpinner;
    }
}
