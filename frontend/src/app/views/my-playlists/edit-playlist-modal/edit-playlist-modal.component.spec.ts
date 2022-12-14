import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPlaylistModalComponent} from './edit-playlist-modal.component';

describe('CreatePlaylistModalComponent', () => {
    let component: EditPlaylistModalComponent;
    let fixture: ComponentFixture<EditPlaylistModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditPlaylistModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditPlaylistModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
