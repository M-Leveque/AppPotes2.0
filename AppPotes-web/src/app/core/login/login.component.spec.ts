import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConstantService } from 'src/app/constant.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AccountComponent } from 'src/app/tabs/account/account.component';
import { AccountOptionComponent } from 'src/app/tabs/account/option/account-option.component';
import { PasswordDialogComponent } from 'src/app/tabs/account/option/password-dialog/password-dialog.component';
import { AlbumAddComponent } from 'src/app/tabs/album/add/album-add.component';
import { AlbumComponent } from 'src/app/tabs/album/album.component';
import { AlbumListComponent } from 'src/app/tabs/album/list/album-list.component';
import { HomePageComponent } from 'src/app/tabs/home-page/home-page.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ErrorComponent } from '../popup/error/error.component';
import { PopupComponent } from '../popup/popup.component';
import { DndDirective } from '../upload/upload-images/dnd.directive';
import { UploadImagesComponent } from '../upload/upload-images/upload-images.component';
import { MatDialogModule, MatFormFieldModule, MatRadioModule, MatSelectModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AccountService } from 'src/app/tabs/account/account.service';
import { AlbumService } from 'src/app/tabs/album/album.service';
import { authInterceptor } from '../interceptors/authInterceptor';
import { AuthGuardService } from './auth-guard.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        NgxGalleryModule,
        MatDialogModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
