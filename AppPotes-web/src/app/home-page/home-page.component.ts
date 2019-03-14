import { Component, OnInit } from '@angular/core';
import { AlbumService } from './../services/album.service';
import { EventService } from './../services/event.service';
import { PoolService } from './../services/pool.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  albums : any[];
  sharedAlbum : any;

  events : any[];
  pools : any[];

  constructor(
    private albumService: AlbumService,
    private eventService: EventService,
    private poolService: PoolService
  ) { }

  ngOnInit(){
    this.sharedAlbum = this.albumService.sharedAlbum;
    this.albums = this.albumService.albums;
    this.events = this.eventService.events;
    this.pools = this.poolService.pools;
  }

}
