import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeactivateUserModalComponent} from './deactivate-user-modal.component';

describe('CreatePlaylistModalComponent', () => {
    let component: DeactivateUserModalComponent;
    let fixture: ComponentFixture<DeactivateUserModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeactivateUserModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeactivateUserModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
