import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Track} from "../../../model/track.model";
import {faSquareArrowUpRight} from '@fortawesome/free-solid-svg-icons';
import {faYoutube} from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

    @Input() track: Track = {};

    faSquareArrowUpRight: any = faSquareArrowUpRight;

    faYoutube: any = faYoutube;

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

}



