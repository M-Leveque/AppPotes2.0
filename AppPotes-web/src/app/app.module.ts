import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { LoginComponent } from './core/login/login.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { HomePageComponent } from './tabs/home-page/home-page.component';
import { AlbumComponent } from './tabs/album/album.component';
import { AlbumAddComponent } from './tabs/album/add/album-add.component';
import { AlbumListComponent } from './tabs/album/list/album-list.component';
import { EventComponent } from './tabs/event/event.component';
import { EventListComponent } from './tabs/event/list/event-list.component';
import { PoolComponent } from './tabs/pool/pool.component';
import { AccountComponent } from './tabs/account/account.component';
import { AccountOptionComponent } from './tabs/account/option/account-option.component';
import { AlbumService } from './tabs/album/album.service';
import { EventService } from './tabs/event/event.service';
import { PoolService } from './tabs/pool/pool.service';
import { ConstantService } from './constant.service';
import { HttpClientModule } from '@angular/common/http';
import { PhotoComponent } from './tabs/photo/photo.component';
import { PhotoAddComponent } from './tabs/photo/add/photo-add.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { UploadImagesComponent } from './core/upload/upload-images/upload-images.component';

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
    AccountOptionComponent,
    PhotoComponent,
    PhotoAddComponent,
    UploadImagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    AlbumService,
    EventService,
    PoolService,
    ConstantService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
