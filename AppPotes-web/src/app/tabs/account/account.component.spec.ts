import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from 'src/app/core/nav-bar/nav-bar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { AccountComponent } from './account.component';
import { LoginComponent } from 'src/app/core/login/login.component';
import { AlbumListComponent } from '../album/list/album-list.component';
import { AlbumComponent } from '../album/album.component';
import { AlbumAddComponent } from '../album/add/album-add.component';
import { AccountOptionComponent } from './option/account-option.component';
import { PageNotFoundComponent } from 'src/app/core/page-not-found/page-not-found.component';
import { UploadImagesComponent } from 'src/app/core/upload/upload-images/upload-images.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, MatFormFieldModule, MatRadioModule, MatSelectModule, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxGalleryModule } from 'ngx-gallery';
import { LoginService } from 'src/app/core/login/login.service';
import { AlbumService } from '../album/album.service';
import { AccountService } from './account.service';
import { ConstantService } from 'src/app/constant.service';
import { AuthGuardService } from 'src/app/core/login/auth-guard.service';
import { authInterceptor } from 'src/app/core/interceptors/authInterceptor';
import { User } from 'src/app/models/User.model';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AccountComponent,
        AccountOptionComponent,
        NavBarComponent,
        LoginComponent,
        AlbumListComponent,
        AlbumComponent,
        AlbumAddComponent,
        PageNotFoundComponent,
        UploadImagesComponent,
      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        HttpClientModule,
        NgxSpinnerModule,
        NgxGalleryModule,
      ],
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
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    component.user = new User(0, 'test', 'test', 'qfezf', '', null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
