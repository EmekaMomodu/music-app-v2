import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    NavModule,
    ProgressModule, SpinnerModule,
    TableModule,
    TabsModule
} from '@coreui/angular';
import {IconModule} from '@coreui/icons-angular';

import {TracksRoutingModule} from './tracks-routing.module';
import {TracksComponent} from './tracks.component';

import {WidgetsModule} from '../widgets/widgets.module';
import {DocsComponentsModule} from "../../../components";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbPaginationModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbdSortableHeader} from "../../util/sortable.directive";

@NgModule({
    imports: [
        TracksRoutingModule,
        CardModule,
        NavModule,
        IconModule,
        TabsModule,
        CommonModule,
        GridModule,
        ProgressModule,
        ReactiveFormsModule,
        ButtonModule,
        FormModule,
        ButtonModule,
        ButtonGroupModule,
        AvatarModule,
        TableModule,
        WidgetsModule,
        DocsComponentsModule,
        FontAwesomeModule,
        NgbPaginationModule,
        NgbTypeaheadModule,
        FormsModule,
        SpinnerModule
    ],
    declarations: [TracksComponent, NgbdSortableHeader]
})
export class TracksModule {
}
