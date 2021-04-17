import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/models/Photo.model';
import { ConstantService } from 'src/app/constant.service';
import { timeout } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { PhotoService } from 'src/app/tabs/photo/photo.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.sass']
})
export class UploadImagesComponent implements OnInit {

  @Input() isMultipleUpload: boolean;
  @Input() filesToUpload: Photo[];
  @Input() fileToUpload: Photo;
  @Input() simpleImage: Photo;

  @Output() newCoverEvent = new EventEmitter<Photo>();

  private host: String;
  private path;
  
  public cover;

  constructor(
    private constantService: ConstantService,
    private photoService: PhotoService,
    private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.host = this.constantService.host;
    this.path = this.constantService.path;

    this.getCover();
  }

  resetPhotos(){
    this.filesToUpload.length = 0;
  }

  handleFileSelect(event){

    if(event.target.files && event.target.files[0]){
      var currentContext = this;
      // Start loader
      this.spinner.show();

      // Case one image upload
      if(!this.isMultipleUpload){
        var reader = new FileReader();
        reader.onload = function(file) {
          currentContext.simpleImage = new Photo(0, '');
          currentContext.simpleImage.b64_image = this.result;
          currentContext.simpleImage.name = currentContext.formatImageName(event.target.files[0].name);
          currentContext.newCoverEvent.emit(currentContext.simpleImage);

          // Stop loader
          currentContext.spinner.hide();

        }
        reader.readAsDataURL(event.target.files[0]);
      }
      // Case multi image upload
      else {
        this.managePhotosUpload(event.target.files);
      }
    }

  }

  managePhotosUpload(files){
    var currentContext = this;
    var nbPhotoUpload = 0;

    for(let file of files){
      var reader = new FileReader();
      reader.onload = function(fre) {

        var photo = new Photo( currentContext.filesToUpload.length, null, null, null );
        photo.b64_image = this.result;
        photo.name = currentContext.formatImageName(file.name);
        currentContext.filesToUpload.push(photo);
        nbPhotoUpload++;

        if(nbPhotoUpload == files.length){
          // Stop loader
          currentContext.spinner.hide();
        }

      }
      reader.readAsDataURL(file);
    }
  }


  formatImageName(name: String){
    let array = name.split('.');
    if(array.length > 1) {
      name = array.slice(0, -1).join('.');
    }
    return name;
  }

  getCover(){ 
    var context = this;
    if(this.simpleImage != undefined){
      this.photoService.get64File(this.simpleImage.id, true).subscribe(
        (file) => {
          context.simpleImage.b64_image = file;
        }
      );
    }
    else {
      this.simpleImage.b64_image = this.constantService.path.photos.default;
    }
  }
  
}
