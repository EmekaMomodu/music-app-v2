import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PoliciesComponent} from './policies.component';

describe('CreatePlaylistModalComponent', () => {
    let component: PoliciesComponent;
    let fixture: ComponentFixture<PoliciesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PoliciesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PoliciesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
