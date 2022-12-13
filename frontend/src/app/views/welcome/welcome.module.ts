import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule, CardModule, FormModule, GridModule} from '@coreui/angular';
import {IconModule} from '@coreui/icons-angular';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {WelcomeRoutingModule} from "./welcome-routing.module";
import {LandingComponent} from "./landing/landing.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        LandingComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        WelcomeRoutingModule,
        CardModule,
        ButtonModule,
        GridModule,
        IconModule,
        FormModule,
        FontAwesomeModule,
        FormsModule
    ]
})
export class WelcomeModule {
}
