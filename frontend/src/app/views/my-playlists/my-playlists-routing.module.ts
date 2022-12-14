import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MyPlaylistsComponent} from './my-playlists.component';
import {AuthGuardService} from "../../service/auth-guard.service";

const routes: Routes = [
    {
        path: '',
        component: MyPlaylistsComponent,
        // canActivate: [AuthGuardService],
        data: {
            title: 'My Playlists'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyPlaylistsRoutingModule {
}
