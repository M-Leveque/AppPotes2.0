import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/tabs/album/album.service';
import { Subscription } from 'rxjs';
import { PhotoService } from 'src/app/tabs/photo/photo.service';
import { ConstantService } from 'src/app/constant.service';
import { Album } from 'src/app/models/Album.model';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryOrder } from 'ngx-gallery';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  album : any;
  idAlbum: any;
  photos : any[];
  albumInfosSubscription: Subscription;
  albumPhotosSubscription : Subscription;
  host: String;
  path: Object;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private albumService: AlbumService, 
    private photoService: PhotoService, 
    private router: ActivatedRoute, 
    private constantService: ConstantService ) {}

  ngOnInit() {

    this.album = new Album();
    this.host = this.constantService.host;
    this.path = this.constantService.path;
    this.idAlbum = this.router.snapshot.params['id'];

    // Get albums
    this.albumInfosSubscription = this.albumService.get(this.idAlbum)
      .subscribe(album => this.album = album[0]);
    
    // Get photo informations
    this.albumPhotosSubscription = this.photoService.getByAlbum(this.idAlbum)
      .subscribe((photos) => {
        this.photos = photos;
        this.loadPhotos();
        this.loadConf();
      });
    this.galleryImages = [];
  }
  loadConf() {
    this.galleryOptions = [
      {
        image: false,
        width: '100%',
        height: (Math.ceil(this.photos.length / 4) * 30)+'vh',
        thumbnailsColumns: 4,
        thumbnailsRows: Math.ceil(this.photos.length / 4),
        thumbnailsOrder: NgxGalleryOrder.Row,
        thumbnailsArrows: false,
        previewZoom: true, 
        previewRotate: true
      }];
  }

  loadPhotos(){
    for(let photo of this.photos){
      this.galleryImages.push({ small: this.host+photo.path_thumb, medium: this.host+photo.path_thumb, big: this.host+photo.path});
    }
    
  }

  ngOnDestroy() {
    this.albumInfosSubscription.unsubscribe();
    this.albumPhotosSubscription.unsubscribe();
  }

  getCover(){
    return this.albumService.getCovers(this.album);
  }

}
