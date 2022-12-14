import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateUserModalComponent} from './update-user-modal.component';

describe('CreatePlaylistModalComponent', () => {
    let component: UpdateUserModalComponent;
    let fixture: ComponentFixture<UpdateUserModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UpdateUserModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateUserModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
