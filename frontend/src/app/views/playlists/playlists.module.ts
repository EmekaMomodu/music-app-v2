import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
    AvatarModule, BadgeModule,
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

import {PlaylistsRoutingModule} from './playlists-routing.module';
import {PlaylistsComponent} from './playlists.component';

import {WidgetsModule} from '../ui-templates/widgets/widgets.module';
import {DocsComponentsModule} from "../../../components";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbPaginationModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {UtilModule} from "../../util/util.module";
import {PlaylistModalComponent} from "./playlist-modal/playlist-modal.component";
import {HideReviewModalComponent} from "./hide-review-modal/hide-review-modal.component";

@NgModule({
    imports: [
        PlaylistsRoutingModule,
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
        BadgeModule
    ],
    declarations: [PlaylistsComponent, PlaylistModalComponent, HideReviewModalComponent]
})
export class PlaylistsModule {
}
