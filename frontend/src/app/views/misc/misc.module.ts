import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MiscRoutingModule} from './misc-routing.module';
import {Page404Component} from './page404/page404.component';
import {Page500Component} from './page500/page500.component';
import {ButtonModule, CardModule, FormModule, GridModule} from '@coreui/angular';
import {IconModule} from '@coreui/icons-angular';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
    declarations: [
        Page404Component,
        Page500Component,
    ],
    imports: [
        CommonModule,
        MiscRoutingModule,
        CardModule,
        ButtonModule,
        GridModule,
        IconModule,
        FormModule,
        FontAwesomeModule
    ]
})
export class MiscModule {
}
