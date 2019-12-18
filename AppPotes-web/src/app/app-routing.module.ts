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

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'home-page', component: HomePageComponent},
    { path: 'album', component: AlbumListComponent},
    { path: 'album/:id', component: AlbumComponent},
    { path: 'album-add', component: AlbumAddComponent},
    { path: 'album-add/:id', component: AlbumAddComponent},
    { path: 'account', component: AccountComponent},
    { path: 'account-option', component: AccountOptionComponent},
    { path: 'event', component: EventListComponent},
    { path: 'event/:id', component: EventComponent},
    { path: 'pool', component: PoolComponent},
    { path: 'photo/:id', component: PhotoComponent},
    { path: 'photo-add/:idAlbum', component: PhotoAddComponent},
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
