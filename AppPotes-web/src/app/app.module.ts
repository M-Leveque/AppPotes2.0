import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AlbumComponent } from './album/album.component';
import { AlbumAddComponent } from './album/add/album-add.component';
import { AlbumListComponent } from './album/list/album-list.component';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event/list/event-list.component';
import { PoolComponent } from './pool/pool.component';
import { AccountComponent } from './account/account.component';
import { AccountOptionComponent } from './account/option/account-option.component';
import { AlbumService } from './services/album.service';
import { EventService } from './services/event.service';
import { PoolService } from './services/pool.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    NavBarComponent,
    HomePageComponent,
    AlbumComponent,
    AlbumAddComponent,
    AlbumListComponent,
    EventComponent,
    EventListComponent,
    PoolComponent,
    AccountComponent,
    AccountOptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    AlbumService,
    EventService,
    PoolService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
