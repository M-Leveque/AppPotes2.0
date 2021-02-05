import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatRadioModule, MatSelectModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { ConstantService } from 'src/app/constant.service';
import { authInterceptor } from 'src/app/core/interceptors/authInterceptor';
import { AuthGuardService } from 'src/app/core/login/auth-guard.service';
import { LoginComponent } from 'src/app/core/login/login.component';
import { LoginService } from 'src/app/core/login/login.service';
import { NavBarComponent } from 'src/app/core/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from 'src/app/core/page-not-found/page-not-found.component';
import { ErrorComponent } from 'src/app/core/popup/error/error.component';
import { PopupComponent } from 'src/app/core/popup/popup.component';
import { DndDirective } from 'src/app/core/upload/upload-images/dnd.directive';
import { UploadImagesComponent } from 'src/app/core/upload/upload-images/upload-images.component';
import { AccountComponent } from '../account/account.component';
import { AccountService } from '../account/account.service';
import { AccountOptionComponent } from '../account/option/account-option.component';
import { PasswordDialogComponent } from '../account/option/password-dialog/password-dialog.component';
import { AlbumAddComponent } from '../album/add/album-add.component';
import { AlbumComponent } from '../album/album.component';
import { AlbumService } from '../album/album.service';
import { AlbumListComponent } from '../album/list/album-list.component';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
