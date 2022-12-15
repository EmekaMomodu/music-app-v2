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
                path: 'playlists',
                loadChildren: () =>
                    import('./views/playlists/playlists.module').then((m) => m.PlaylistsModule)
            },
            {
                path: 'my-playlists',
                loadChildren: () =>
                    import('./views/my-playlists/my-playlists.module').then((m) => m.MyPlaylistsModule)
            },
            {
                path: 'users',
                loadChildren: () =>
                    import('./views/users/users.module').then((m) => m.UsersModule)
            },
            {
                path: 'policies',
                loadChildren: () =>
                    import('./views/policies/policies.module').then((m) => m.PoliciesModule)
            },
            {
                path: 'security-policy',
                loadChildren: () =>
                    import('./views/policies-public/security-policy/security-policy.module').then((m) => m.SecurityPolicyModule)
            },




            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./views/ui-templates/dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'theme',
                loadChildren: () =>
                    import('./views/ui-templates/theme/theme.module').then((m) => m.ThemeModule)
            },
            {
                path: 'base',
                loadChildren: () =>
                    import('./views/ui-templates/base/base.module').then((m) => m.BaseModule)
            },
            {
                path: 'buttons',
                loadChildren: () =>
                    import('./views/ui-templates/buttons/buttons.module').then((m) => m.ButtonsModule)
            },
            {
                path: 'forms',
                loadChildren: () =>
                    import('./views/ui-templates/forms/forms.module').then((m) => m.CoreUIFormsModule)
            },
            {
                path: 'charts',
                loadChildren: () =>
                    import('./views/ui-templates/charts/charts.module').then((m) => m.ChartsModule)
            },
            {
                path: 'icons',
                loadChildren: () =>
                    import('./views/ui-templates/icons/icons.module').then((m) => m.IconsModule)
            },
            {
                path: 'notifications',
                loadChildren: () =>
                    import('./views/ui-templates/notifications/notifications.module').then((m) => m.NotificationsModule)
            },
            {
                path: 'widgets',
                loadChildren: () =>
                    import('./views/ui-templates/widgets/widgets.module').then((m) => m.WidgetsModule)
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
