import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyPlaylistModalComponent} from './my-playlist-modal.component';

describe('MyPlaylistModalComponent', () => {
    let component: MyPlaylistModalComponent;
    let fixture: ComponentFixture<MyPlaylistModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MyPlaylistModalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyPlaylistModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
