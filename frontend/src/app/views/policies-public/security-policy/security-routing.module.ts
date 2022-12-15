import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {AuthGuardService} from "../../../service/auth-guard.service";
import {AuthGuardAdminService} from "../../../service/auth-guard-admin.service";
import {SecurityPolicyComponent} from "./security-policy.component";

const routes: Routes = [
    {
        path: '',
        component: SecurityPolicyComponent,
        data: {
            title: 'Security policy'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule {
}
