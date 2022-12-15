import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-update-user-modal',
    templateUrl: './email-verification-success-modal.component.html',
    styleUrls: ['./email-verification-success-modal.component.scss']
})
export class EmailVerificationSuccessModalComponent implements OnInit {

    faCircleCheck: any = faCircleCheck;


    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

}



