import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HideReviewModalComponent} from './hide-review-modal.component';

describe('HideReviewModalComponent', () => {
    let component: HideReviewModalComponent;
    let fixture: ComponentFixture<HideReviewModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HideReviewModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HideReviewModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
