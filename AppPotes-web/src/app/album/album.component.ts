import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from './../services/album.service';
import { Subscription } from 'rxjs';

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

  constructor(private albumService: AlbumService, private router: ActivatedRoute ) {}

  ngOnInit() {
    let idAlbum = this.router.snapshot.params['id'];
    this.albumInfosSubscription = this.albumService.get(idAlbum)
      .subscribe(album => this.album = album);    

    this.albumPhotosSubscription = this.albumService.getPhotos(idAlbum)
      .subscribe(photos => this.photos = photos);
  }

  ngOnDestroy() {
    this.albumInfosSubscription.unsubscribe();
    this.albumPhotosSubscription.unsubscribe();
  }

}
