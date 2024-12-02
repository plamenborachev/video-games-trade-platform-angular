import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { GameDetailsComponent } from './game/game-details/game-details.component';
import { GameEditComponent } from './game/game-edit/game-edit.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CatalogComponent } from './game/catalog/catalog.component';
import { GameCreateComponent } from './game/game-create/game-create.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'catalog', component: CatalogComponent },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },

    {
        path: 'games',
        children: [
            { path: 'details/:gameId', component: GameDetailsComponent },
            { path: 'create', component: GameCreateComponent, canActivate: [AuthGuard],},
            { path: 'edit/:gameId', component: GameEditComponent, canActivate: [AuthGuard],},            
        ]
    },

    { path: 'error', component: ErrorMessageComponent },
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404' },
];
