import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: ''
        },
        children: [
            {
                path: '',
                component: LandingComponent,
                data: {
                    title: ''
                }
            },
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: 'Login'
                }
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    title: 'Register'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WelcomeRoutingModule {
}
