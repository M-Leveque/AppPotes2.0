import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from './../services/album.service';
import { Subscription } from 'rxjs';
import { PhotoService } from '../services/photo.service';
import { ConstantService } from '../services/constant.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  album : any;
  photos : any[];
  albumInfosSubscription: Subscription;
  albumPhotosSubscription : Subscription;
  host: String;

  constructor(private albumService: AlbumService, private photoService: PhotoService, 
              private router: ActivatedRoute, private constantService: ConstantService ) {}

  ngOnInit() {
  
    this.host = this.constantService.host;
    let idAlbum = this.router.snapshot.params['id'];

    // Get albums
    this.albumInfosSubscription = this.albumService.get(idAlbum)
      .subscribe(album => this.album = album);
    
    // Get photo informations
    this.albumPhotosSubscription = this.albumService.getPhotos(idAlbum)
      .subscribe(photos => this.photos = photos);
  }

  ngOnDestroy() {
    this.albumInfosSubscription.unsubscribe();
    this.albumPhotosSubscription.unsubscribe();
  }

}
