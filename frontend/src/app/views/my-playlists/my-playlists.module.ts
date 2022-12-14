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

import {MyPlaylistsRoutingModule} from './my-playlists-routing.module';
import {MyPlaylistsComponent} from './my-playlists.component';

import {WidgetsModule} from '../ui-templates/widgets/widgets.module';
import {DocsComponentsModule} from "../../../components";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbPaginationModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {UtilModule} from "../../util/util.module";
import {CreatePlaylistModalComponent} from "./create-playlist-modal/create-playlist-modal.component";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {ViewPlaylistModalComponent} from "./view-playlist-modal/view-playlist-modal.component";
import {EditPlaylistModalComponent} from "./edit-playlist-modal/edit-playlist-modal.component";


@NgModule({
    imports: [
        MyPlaylistsRoutingModule,
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
    declarations: [MyPlaylistsComponent, CreatePlaylistModalComponent, ViewPlaylistModalComponent, EditPlaylistModalComponent]
})
export class MyPlaylistsModule {
}
