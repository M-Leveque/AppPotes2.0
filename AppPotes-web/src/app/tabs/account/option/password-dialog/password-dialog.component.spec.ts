import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatRadioModule, MatSelectModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { User } from 'src/app/models/User.model';
import { AlbumAddComponent } from 'src/app/tabs/album/add/album-add.component';
import { AlbumComponent } from 'src/app/tabs/album/album.component';
import { AlbumService } from 'src/app/tabs/album/album.service';
import { AlbumListComponent } from 'src/app/tabs/album/list/album-list.component';
import { HomePageComponent } from 'src/app/tabs/home-page/home-page.component';
import { AccountComponent } from '../../account.component';
import { AccountService } from '../../account.service';
import { AccountOptionComponent } from '../account-option.component';
import { DialogData } from './password-dialog-data.interface';

import { PasswordDialogComponent } from './password-dialog.component';

describe('PasswordDialogComponent', () => {
  let component: PasswordDialogComponent;
  let fixture: ComponentFixture<PasswordDialogComponent>;
  

  const user = new User(0, 'test', 'test', 'qfezf', '', null);
  const model: DialogData = {
    user: user,
    callback: function() {},
    context: {}
  };

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
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        NgxGalleryModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule],
      providers: [    
        LoginService,
        AlbumService,
        AccountService,
        ConstantService,
        AuthGuardService,
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
        { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA,
          useValue: model
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordDialogComponent);
    component = fixture.componentInstance;
    component.initForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
