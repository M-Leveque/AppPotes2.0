import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { LoginComponent } from './core/login/login.component';
import { HomePageComponent } from './tabs/home-page/home-page.component';
import { AlbumComponent } from './tabs/album/album.component';
import { AlbumAddComponent } from './tabs/album/add/album-add.component';
import { AlbumListComponent } from './tabs/album/list/album-list.component';
import { EventComponent } from './tabs/event/event.component';
import { EventListComponent } from './tabs/event/list/event-list.component';
import { PoolComponent } from './tabs/pool/pool.component';
import { AccountComponent } from './tabs/account/account.component';
import { AccountOptionComponent } from './tabs/account/option/account-option.component';
import { PhotoComponent } from './tabs/photo/photo.component';
import { PhotoAddComponent } from './tabs/photo/add/photo-add.component';
import { AuthGuardService as AuthGuard } from './core/login/auth-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
    { path: 'album', component: AlbumListComponent, canActivate: [AuthGuard] },
    { path: 'album/:id', component: AlbumComponent, canActivate: [AuthGuard] },
    { path: 'album-add', component: AlbumAddComponent, canActivate: [AuthGuard] },
    { path: 'album-add/:id', component: AlbumAddComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'account-option', component: AccountOptionComponent, canActivate: [AuthGuard] },
    { path: 'event', component: EventListComponent, canActivate: [AuthGuard] },
    { path: 'event/:id', component: EventComponent, canActivate: [AuthGuard] },
    { path: 'pool', component: PoolComponent, canActivate: [AuthGuard] },
    { path: 'photo/:id', component: PhotoComponent, canActivate: [AuthGuard] },
    { path: 'photo-add/:idAlbum', component: PhotoAddComponent, canActivate: [AuthGuard] },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
