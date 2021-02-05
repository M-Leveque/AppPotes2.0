import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConstantService } from 'src/app/constant.service';

import { UploadImagesComponent } from './upload-images.component';

describe('UploadImagesComponent', () => {
  let component: UploadImagesComponent;
  let fixture: ComponentFixture<UploadImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImagesComponent ],
      providers: [ConstantService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
