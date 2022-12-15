import {Component, OnInit} from '@angular/core';
import {FooterComponent} from '@coreui/angular';

@Component({
    selector: 'app-default-footer',
    templateUrl: './default-footer.component.html',
    styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent implements OnInit{

    securityPolicyUrl: any;
    aupUrl: any;
    dmcaUrl: any;

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.securityPolicyUrl = 'https://docs.google.com/document/d/e/2PACX-1vSpseOcdWZ5HsPT1kfjdVdZsH6DqXOWG1AaPDZy9LS3MjfZHWu0Gs_w1yPAPPNmTQ/pub';
        this.aupUrl = 'https://docs.google.com/document/d/e/2PACX-1vQO7lYezveXw1vzWMyI7hA_sZ5Unv4RtrHv7ICfEbDcJJqBK_x3b-1SRdrLZ10fMQ/pub';
        this.dmcaUrl = 'https://docs.google.com/document/d/e/2PACX-1vTS01JrIJ0vzGtPfaunGQoOMTYKhL1whNlLQAA7N5CYPplF9jhUdUZ5m4TSlgqzFA/pub';
    }




}
