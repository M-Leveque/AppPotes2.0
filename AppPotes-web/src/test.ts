// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatRadioModule, MatButtonModule, MatSelectModule, MatInputModule, MatRippleModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { ConstantService } from './app/constant.service';
import { authInterceptor } from './app/core/interceptors/authInterceptor';
import { AuthGuardService } from './app/core/login/auth-guard.service';
import { LoginComponent } from './app/core/login/login.component';
import { LoginService } from './app/core/login/login.service';
import { NavBarComponent } from './app/core/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './app/core/page-not-found/page-not-found.component';
import { ErrorComponent } from './app/core/popup/error/error.component';
import { PopupComponent } from './app/core/popup/popup.component';
import { DndDirective } from './app/core/upload/upload-images/dnd.directive';
import { UploadImagesComponent } from './app/core/upload/upload-images/upload-images.component';
import { AccountComponent } from './app/tabs/account/account.component';
import { AccountService } from './app/tabs/account/account.service';
import { AccountOptionComponent } from './app/tabs/account/option/account-option.component';
import { PasswordDialogComponent } from './app/tabs/account/option/password-dialog/password-dialog.component';
import { AlbumAddComponent } from './app/tabs/album/add/album-add.component';
import { AlbumComponent } from './app/tabs/album/album.component';
import { AlbumService } from './app/tabs/album/album.service';
import { AlbumListComponent } from './app/tabs/album/list/album-list.component';
import { HomePageComponent } from './app/tabs/home-page/home-page.component';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
