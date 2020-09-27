import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { LoginComponent } from './core/login/login.component';
import { LoginService } from './core/login/login.service';
import { AuthGuardService } from './core/login/auth-guard.service';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { HomePageComponent } from './tabs/home-page/home-page.component';
import { AlbumComponent } from './tabs/album/album.component';
import { AlbumAddComponent } from './tabs/album/add/album-add.component';
import { AlbumListComponent } from './tabs/album/list/album-list.component';
import { AccountComponent } from './tabs/account/account.component';
import { AccountOptionComponent } from './tabs/account/option/account-option.component';
import { AlbumService } from './tabs/album/album.service';
import { AccountService } from './tabs/account/account.service';
import { ConstantService } from './constant.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/authInterceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { UploadImagesComponent } from './core/upload/upload-images/upload-images.component';
import { PopupComponent } from './core/popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordDialogComponent } from './tabs/account/option/password-dialog/password-dialog.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatRadioModule,
  MatSelectModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';

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
    AccountComponent,
    AccountOptionComponent,
    UploadImagesComponent,
    PopupComponent,
    PasswordDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRippleModule
  ],
  providers: [
    LoginService,
    AlbumService,
    AccountService,
    ConstantService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true }
  ],
  entryComponents: [PopupComponent, PasswordDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
