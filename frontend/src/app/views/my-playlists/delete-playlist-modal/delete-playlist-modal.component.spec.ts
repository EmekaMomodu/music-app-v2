import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeletePlaylistModalComponent} from './delete-playlist-modal.component';

describe('CreatePlaylistModalComponent', () => {
    let component: DeletePlaylistModalComponent;
    let fixture: ComponentFixture<DeletePlaylistModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeletePlaylistModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeletePlaylistModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
