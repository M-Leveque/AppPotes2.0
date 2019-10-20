import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AlbumComponent} from './album/album.component';
import {AlbumAddComponent} from './album/add/album-add.component';
import {AlbumListComponent} from './album/list/album-list.component';
import {EventComponent} from './event/event.component';
import {EventListComponent} from './event/list/event-list.component';
import {PoolComponent} from './pool/pool.component';
import {PhotoComponent} from './photo/photo.component';
import {PhotoAddComponent} from './photo/add/photo-add.component';
import {AccountComponent} from './account/account.component';
import {AccountOptionComponent} from './account/option/account-option.component';

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
