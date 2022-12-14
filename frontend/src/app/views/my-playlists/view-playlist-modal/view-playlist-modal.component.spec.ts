import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewPlaylistModalComponent} from './view-playlist-modal.component';

describe('CreatePlaylistModalComponent', () => {
    let component: ViewPlaylistModalComponent;
    let fixture: ComponentFixture<ViewPlaylistModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ViewPlaylistModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewPlaylistModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
