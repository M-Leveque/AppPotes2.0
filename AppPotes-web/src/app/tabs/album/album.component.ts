import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/tabs/album/album.service';
import { Subscription } from 'rxjs';
import { PhotoService } from 'src/app/tabs/photo/photo.service';
import { ConstantService } from 'src/app/constant.service';
import { Album } from 'src/app/models/Album.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  album : any;
  idAlbum: any;
  photos : any[] = [];
  albumInfosSubscription: Subscription;
  albumPhotosSubscription : Subscription;
  host: String;
  path: Object;
  cover: any;

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
      .subscribe((album) => {
        this.album = album[0];
        this.getCover();
      });
    
    // Get photo informations
    this.albumPhotosSubscription = this.photoService.getByAlbum(this.idAlbum)
      .subscribe((photos) => {
        this.photos = photos;
      });
  }

  ngOnDestroy() {
    this.albumInfosSubscription.unsubscribe();
    this.albumPhotosSubscription.unsubscribe();
  }

  getCover(){
    if(this.album && this.album.photo){
      this.photoService.get64File(this.album.photo.id, false).subscribe(
        (img) => {
          this.cover = img;
        },
        (error) => {}
      );
    }
    else {
      this.cover = this.constantService.path.photos.default;
    }
  }

}
