import { Component, OnInit } from '@angular/core';
import { AlbumService } from './../services/album.service';
import { EventService } from './../services/event.service';
import { PoolService } from './../services/pool.service';
import { Subscription } from 'rxjs';
import { ConstantService } from './../services/constant.service';

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

  events : any[];
  pools : any[];

  constructor(
    private albumService: AlbumService,
    private eventService: EventService,
    private poolService: PoolService,
    private constantService: ConstantService
  ) { }

  ngOnInit(){

    this.host = this.constantService.host;

    this.albumSubscription = this.albumService.all()
    .subscribe( (albums) => {
      this.sharedAlbum = albums.shift();
      this.albums = albums;
    });  

    this.events = this.eventService.events;
    this.pools = this.poolService.pools;
  }
}
