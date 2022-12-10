import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TracksComponent} from './tracks.component';

const routes: Routes = [
    {
        path: '',
        component: TracksComponent,
        data: {
            title: 'Tracks'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TracksRoutingModule {
}
