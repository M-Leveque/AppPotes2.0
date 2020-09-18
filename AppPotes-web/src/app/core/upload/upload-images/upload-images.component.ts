import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/models/Photo.model';
import { ConstantService } from 'src/app/constant.service';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.sass']
})
export class UploadImagesComponent implements OnInit {

  @Input() isMultipleUpload: boolean;
  @Input() filesToUpload: Photo[];
  @Input() fileToUpload: Photo;
  @Input() simpleImagePath: String;

  @Output() newCoverEvent = new EventEmitter<Photo>();

  private host: String;
  private path;

  constructor(private constantService: ConstantService) {}

  ngOnInit() {
    this.host = this.constantService.host;
    this.path = this.constantService.path;
  }

  resetPhotos(){
    this.filesToUpload.length = 0;
  }

  handleFileSelect(event){

    if(event.target.files && event.target.files[0]){
      var currentContext = this;

      // Case one image upload
      if(!this.isMultipleUpload){
        var photo = new Photo( 0, null, null, null );
        var reader = new FileReader();
        reader.onload = function(file) {
          photo.b64_image = this.result;
          photo.name = currentContext.formatImageName(event.target.files[0].name);
          currentContext.newCoverEvent.emit(photo);
        }
        reader.readAsDataURL(event.target.files[0]);
      }
      // Case multi image upload
      else {
        for(let file of event.target.files){
          var reader = new FileReader();
          reader.onload = function(fre) {
            var photo = new Photo( currentContext.filesToUpload.length, null, null, null );
            photo.b64_image = this.result;
            photo.name = currentContext.formatImageName(file.name);
            currentContext.filesToUpload.push(photo);
            console.log(currentContext.filesToUpload);
          }
          reader.readAsDataURL(file);
        }
      }
    }

  }

  formatImageName(name: String){
    let batman = name.split('.');
    if(batman.length > 1) {
      name = batman.slice(0, -1).join('.');
    }
    return name;
  }
}
