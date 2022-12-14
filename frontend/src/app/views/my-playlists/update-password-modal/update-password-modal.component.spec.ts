import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdatePasswordModalComponent} from './update-password-modal.component';

describe('CreatePlaylistModalComponent', () => {
    let component: UpdatePasswordModalComponent;
    let fixture: ComponentFixture<UpdatePasswordModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UpdatePasswordModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdatePasswordModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
