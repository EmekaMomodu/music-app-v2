import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './users.component';
import {AuthGuardService} from "../../service/auth-guard.service";
import {AuthGuardAdminService} from "../../service/auth-guard-admin.service";

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        canActivate: [AuthGuardAdminService],
        data: {
            title: 'My Playlists'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
