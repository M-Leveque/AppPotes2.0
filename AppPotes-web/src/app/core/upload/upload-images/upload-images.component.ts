import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PhotoService } from 'src/app/tabs/photo/photo.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.sass']
})
export class UploadImagesComponent implements OnInit {

  @Input() isMultipleUpload: boolean;
  @Input() idsImages: Number[];
  @Input() img: String;

  @Input() initImage : Function;

  private nbFilesToUpload = 0;
  private nbFileUploaded: number;

  constructor( private spinner: NgxSpinnerService,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
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
    var binary = evt.target.result;
    this.initImage(binary);
  }

  /**
   * Convert select photos to 
   * base64 string en store this
   * on tmp zone.
   * @param evt 
   */
  loadImages(evt) {

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

    this.photoService.add(formData).subscribe( 
      response => {
        this.idsImages.push(response.id);
        this.nbFileUploaded++;

        if(this.nbFileUploaded == this.nbFilesToUpload)this.spinner.hide();
      }
    );
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
}
