import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule, CollapseModule,
    FormModule,
    GridModule,
    ListGroupModule,
    NavModule,
    ProgressModule,
    SpinnerModule,
    TableModule,
    TabsModule
} from '@coreui/angular';
import {IconModule} from '@coreui/icons-angular';

import {PoliciesRoutingModule} from './policies-routing.module';

import {WidgetsModule} from '../ui-templates/widgets/widgets.module';
import {DocsComponentsModule} from "../../../components";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbPaginationModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {UtilModule} from "../../util/util.module";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {PoliciesComponent} from "./policies.component";


@NgModule({
    imports: [
        PoliciesRoutingModule,
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
        SpinnerModule,
        UtilModule,
        ListGroupModule,
        CollapseModule,
        AutocompleteLibModule
    ],
    declarations: [PoliciesComponent]
})
export class PoliciesModule {
}
