import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PhotoService } from 'src/app/tabs/photo/photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

  @Input() photos;

  albumPhotosSubscription : Subscription;

  public showViewer;
  public photo;
  public file;

  constructor(
    private ref: ChangeDetectorRef,
    private photoService: PhotoService) { 
    this.showViewer = false;
  }

  ngOnInit() {
    
  }

  public view(photo){
    this.photo=photo;
    this.getPhoto();
    this.showViewer = true;
  }

  public close(){
    this.showViewer = false;
  }

  public goNext(){
    var photo = this.photos[this.getPhotoIndex()+1];
    photo != null ? this.view(photo) : null;
  }

  public goBack(){
    var photo = this.photos[this.getPhotoIndex()-1];
    photo != null ? this.view(photo) : null;
  }

  public getThumbs(){

  }

  public getPhoto(){
    this.photoService.getFile(this.photo.id, false).subscribe(
      (result) => {
        this.file = btoa(result);
      },
      (error) => {

      }
    );
  }

  private getPhotoIndex(){
    var photoName = this.photo.name;
    return this.photos.findIndex(photo => photo.name === photoName);
  }
}
