import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from './containers';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: 'Welcome'
        },
        children: [
            {
                path: 'welcome',
                loadChildren: () =>
                    import('./views/welcome/welcome.module').then((m) => m.WelcomeModule)
            },
            {
                path: 'tracks',
                loadChildren: () =>
                    import('./views/tracks/tracks.module').then((m) => m.TracksModule)
            },


            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'theme',
                loadChildren: () =>
                    import('./views/theme/theme.module').then((m) => m.ThemeModule)
            },
            {
                path: 'base',
                loadChildren: () =>
                    import('./views/base/base.module').then((m) => m.BaseModule)
            },
            {
                path: 'buttons',
                loadChildren: () =>
                    import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
            },
            {
                path: 'forms',
                loadChildren: () =>
                    import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
            },
            {
                path: 'charts',
                loadChildren: () =>
                    import('./views/charts/charts.module').then((m) => m.ChartsModule)
            },
            {
                path: 'icons',
                loadChildren: () =>
                    import('./views/icons/icons.module').then((m) => m.IconsModule)
            },
            {
                path: 'notifications',
                loadChildren: () =>
                    import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
            },
            {
                path: 'widgets',
                loadChildren: () =>
                    import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
            },
        ]
    },
    {
        path: 'misc',
        loadChildren: () =>
            import('./views/misc/misc.module').then((m) => m.MiscModule)
    },
    {path: '**', redirectTo: 'welcome'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'top',
            anchorScrolling: 'enabled',
            initialNavigation: 'enabledBlocking'
            // relativeLinkResolution: 'legacy'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
