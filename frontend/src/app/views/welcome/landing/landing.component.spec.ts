import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonModule, FormModule, GridModule} from '@coreui/angular';
import {IconModule, IconSetService} from '@coreui/icons-angular';
import {iconSubset} from '../../../util/icons/icon-subset';
import {LandingComponent} from './landing.component';

describe('LandingComponent', () => {
    let component: LandingComponent;
    let fixture: ComponentFixture<LandingComponent>;
    let iconSetService: IconSetService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LandingComponent],
            imports: [FormModule, GridModule, ButtonModule, IconModule],
            providers: [IconSetService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        iconSetService = TestBed.inject(IconSetService);
        iconSetService.icons = {...iconSubset};

        fixture = TestBed.createComponent(LandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
