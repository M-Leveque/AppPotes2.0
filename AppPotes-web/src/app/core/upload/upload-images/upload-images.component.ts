import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PhotoService } from 'src/app/tabs/photo/photo.service';
import { SimplePlaceholderMapper } from '@angular/compiler/src/i18n/serializers/serializer';
import { ConstantService } from 'src/app/constant.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.sass']
})
export class UploadImagesComponent implements OnInit {

  @Input() isMultipleUpload: boolean;
  @Input() idsImages: Number[];
  @Input() idSimpleImage: Number[];
  @Input() simpleImagePath: String;

  private nbFilesToUpload = 0;
  private nbFileUploaded: number;
  private host: String;
  private path;
  private imagePath: String;

  constructor( private spinner: NgxSpinnerService,
    private photoService: PhotoService,
    private constantService: ConstantService
  ) { }

  ngOnInit() {
    this.host = this.constantService.host;
    this.path = this.constantService.path;
  }

  resetPhotos(){
    this.photoService.clearTmpFiles(this.idsImages);
    this.idsImages.length = 0;
  }

  handleFileSelect(evt){
    this.nbFilesToUpload = 0;

    var files = evt.target.files;
    this.nbFilesToUpload = files.length;
    this.nbFileUploaded = 0;

    if (files) {

      // Browse file add
      for(let file of files){

        // Send img to backend
        this.sendFile(file);
      }

    }
  }

  /**
   * This method send img 
   * to back for mass upload.
   * @param file 
   * @param callback 
   */
  sendFile(file: any){

    var callback = null;
    if(this.isMultipleUpload) callback = this.loadImages;
    else callback = this.loadImage;

    // Read file add
    var reader = new FileReader();
    reader.onload = callback.bind(this);

    reader.readAsBinaryString(file);
  }

  /**
   * Convert cover img to base64 string.
   */
  loadImage(evt) {
    var context = this;
    var callToReponse = function(response){
      console.log(response);
      context.idSimpleImage.push(response.id);
      context.simpleImagePath = '/tmp/'+response.id+'.png'
      context.spinner.hide();
    }

    this.uploadImageTmp(evt, callToReponse);
  }

  /**
   * Convert select photos to 
   * base64 string en store this
   * on tmp zone.
   * @param evt 
   */
  loadImages(evt) {

    var context = this;
    var callToReponse = function(response){
      context.idsImages.push(response.id);
      context.nbFileUploaded++;

      if(context.nbFileUploaded == context.nbFilesToUpload)context.spinner.hide();
    }

    this.uploadImageTmp(evt, callToReponse);
  }

  uploadImageTmp(evt, callToReponse){
    var binary = evt.target.result;

    // Start loader
    this.spinner.show();
    let img = btoa(binary);

    // Data of form
    let formData = new FormData();

    // Generate unique img id
    let id = this.generateID(10);

    // Prepare datas
    formData.append('file', img);
    formData.append('id', id);

    this.photoService.add(formData).subscribe(callToReponse);
  }

  /**
   * Generate random id.
   * @param lenght 
   */
  generateID(lenght: Number){

    var id = "";

    for(var i=0; i< lenght; i++){
      id += Math.floor((Math.random() * 9) + 1).toString();
    }

    return id;
  }

  /**
   * Type of image.
   * Check if image is tmp or not
   */
  getPath($img: String){

    console.log($img);
    if($img.includes("tmp")){
      return this.host + "/img"+$img; 
    }

    return this.host + this.path.albums + $img;
  }
}
