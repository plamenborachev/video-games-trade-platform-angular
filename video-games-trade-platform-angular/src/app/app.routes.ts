import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
    { path: 'catalog', loadComponent: () => import('./game/catalog/catalog.component').then(c => c.CatalogComponent) },
    { path: 'search', loadComponent: () => import('./game/search/search.component').then(c => c.SearchComponent) },

    { path: 'login', loadComponent: () => import('./user/login/login.component').then(c => c.LoginComponent) },
    { path: 'register', loadComponent: () => import('./user/register/register.component').then(c => c.RegisterComponent) },
    { path: 'profile', loadComponent: () => import('./user/profile/profile.component').then(c => c.ProfileComponent) },

    { path: 'games',
        children: [
            { path: 'details/:gameId',
                loadComponent: () => import('./game/game-details/game-details.component').then(c => c.GameDetailsComponent) },
            { path: 'create',
                canActivate: [AuthGuard],
                loadComponent: () => import('./game/game-create/game-create.component').then(c => c.GameCreateComponent),
            },
            { path: 'edit/:gameId',
                canActivate: [AuthGuard],
                loadComponent: () => import('./game/game-edit/game-edit.component').then(c => c.GameEditComponent),
            },            
        ]
    },

    { path: 'error', loadComponent: () => import('./shared/error-message/error-message.component').then(c => c.ErrorMessageComponent) },
    { path: '404', loadComponent: () => import('./error/error.component').then(c => c.ErrorPageComponent) },
    { path: '**', redirectTo: '/404' },
];
