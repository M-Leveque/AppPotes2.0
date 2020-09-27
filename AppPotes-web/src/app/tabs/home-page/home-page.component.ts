import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/tabs/album/album.service';
import { Subscription } from 'rxjs';
import { ConstantService } from 'src/app/constant.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  albumSubscription : Subscription;
  albums : any[] = [];
  sharedAlbum : any = {};
  host: String;
  path;

  events : any[];
  pools : any[];

  constructor(
    private albumService: AlbumService,
    private constantService: ConstantService
  ) { }

  ngOnInit(){

    this.host = this.constantService.host;
    this.path = this.constantService.path;

    this.albumSubscription = this.albumService.all()
    .subscribe( (albums) => {
      this.sharedAlbum = albums.shift();
      this.albums = albums;
    });
  }

  getCover(album){
    return this.albumService.getCovers(album);
  }
}
