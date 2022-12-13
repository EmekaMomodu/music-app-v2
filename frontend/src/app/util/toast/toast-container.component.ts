import {Component, TemplateRef} from '@angular/core';

import {ToastService} from './toast.service';
import {NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-toasts',
    standalone: true,
    imports: [NgbToastModule, NgIf, NgTemplateOutlet, NgFor],
    template: `
        <ngb-toast
                *ngFor="let toast of toastService.toasts"
                [class]="toast.classname"
                [delay]="toast.delay || 5000"
                (hidden)="toastService.remove(toast)"
                [autohide]="autohide"
                (mouseenter)="autohide = false"
                (mouseleave)="autohide = true"
                (hide)="show = false; autohide = true"
                [header]="toast.header"
        >
            <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
                <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
            </ng-template>

            <ng-template #text>{{ toast.textOrTpl }}</ng-template>
        </ngb-toast>
    `,
    host: {class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200'},
})
export class ToastsContainer {

    show = false;
    autohide = true;

    constructor(public toastService: ToastService) {
    }

    isTemplate(toast: any) {
        return toast.textOrTpl instanceof TemplateRef;
    }
}
