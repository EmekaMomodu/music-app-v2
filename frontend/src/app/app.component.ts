import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {IconSetService} from '@coreui/icons-angular';
import {iconSubset} from './util/icons/icon-subset';
import {Title} from '@angular/platform-browser';
import {AuthService} from "./service/auth.service";

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'body',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
    title = 'PAC Music App';

    constructor(
        private router: Router,
        private titleService: Title,
        private iconSetService: IconSetService,
        private authService: AuthService
    ) {
        this.authService.autoLogin();
        titleService.setTitle(this.title);
        // iconSet singleton
        iconSetService.icons = {...iconSubset};
    }

    ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
        });
    }
}
