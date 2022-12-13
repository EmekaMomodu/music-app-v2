import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from './page404/page404.component';
import {Page500Component} from './page500/page500.component';

const routes: Routes = [

    {
        path: '',
        data: {
            title: 'misc'
        },
        children: [
            {
                path: '404',
                component: Page404Component,
                data: {
                    title: 'Page 404'
                }
            },
            {
                path: '500',
                component: Page500Component,
                data: {
                    title: 'Page 500'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MiscRoutingModule {
}
