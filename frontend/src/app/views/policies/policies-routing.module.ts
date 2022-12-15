import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from "../../service/auth-guard.service";
import {PoliciesComponent} from "./policies.component";
import {AuthGuardAdminService} from "../../service/auth-guard-admin.service";

const routes: Routes = [
    {
        path: '',
        component: PoliciesComponent,
        canActivate: [AuthGuardAdminService],
        data: {
            title: 'Policies'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PoliciesRoutingModule {
}
