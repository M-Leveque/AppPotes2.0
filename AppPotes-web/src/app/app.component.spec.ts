import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatRadioModule, MatButtonModule, MatSelectModule, MatInputModule, MatRippleModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConstantService } from './constant.service';
import { authInterceptor } from './core/interceptors/authInterceptor';
import { AuthGuardService } from './core/login/auth-guard.service';
import { LoginComponent } from './core/login/login.component';
import { LoginService } from './core/login/login.service';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ErrorComponent } from './core/popup/error/error.component';
import { PopupComponent } from './core/popup/popup.component';
import { DndDirective } from './core/upload/upload-images/dnd.directive';
import { UploadImagesComponent } from './core/upload/upload-images/upload-images.component';
import { AccountComponent } from './tabs/account/account.component';
import { AccountService } from './tabs/account/account.service';
import { AccountOptionComponent } from './tabs/account/option/account-option.component';
import { PasswordDialogComponent } from './tabs/account/option/password-dialog/password-dialog.component';
import { AlbumAddComponent } from './tabs/album/add/album-add.component';
import { AlbumComponent } from './tabs/album/album.component';
import { AlbumService } from './tabs/album/album.service';
import { AlbumListComponent } from './tabs/album/list/album-list.component';
import { HomePageComponent } from './tabs/home-page/home-page.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        PasswordDialogComponent,
        ErrorComponent,
        DndDirective ],
      imports: [    
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        NgxGalleryModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatRippleModule],
      providers: [    
        LoginService,
        AlbumService,
        AccountService,
        ConstantService,
        AuthGuardService,
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
        { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'AppPotes-web'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('AppPotes-web');
  });
});
