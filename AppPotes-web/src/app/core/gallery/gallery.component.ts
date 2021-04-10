import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { CONTEXT } from '@angular/core/src/render3/interfaces/view';
import { Subscription } from 'rxjs';
import { PhotoService } from 'src/app/tabs/photo/photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

  @Input() photos;

  public showViewer;
  public photo;
  public file;

  constructor(
    private ref: ChangeDetectorRef,
    private photoService: PhotoService) { 
    this.showViewer = false;
  }

  ngOnInit() {
    this.getThumbs();
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
    for(var photo of this.photos){
      this.getThumb(photo);
    }
  }

  public getThumb(photo){
    this.photoService.get64File(photo.id, true).subscribe(
      (img) => {
        photo.src = img;
      },
      (error) => {}
    );
  }

  public getPhoto(){
    var context = this;
    this.photoService.get64File(this.photo.id, false).subscribe(
      (img) => {
        context.file = img;
      },
      (error) => {}
    );
  }

  private getPhotoIndex(){
    var photoName = this.photo.name;
    return this.photos.findIndex(photo => photo.name === photoName);
  }
}
