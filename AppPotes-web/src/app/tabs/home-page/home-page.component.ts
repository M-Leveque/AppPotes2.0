import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/tabs/album/album.service';
import { EventService } from 'src/app/tabs/event/event.service';
import { PoolService } from 'src/app/tabs/pool/pool.service';
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
    private eventService: EventService,
    private poolService: PoolService,
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

    this.events = this.eventService.events;
    this.pools = this.poolService.pools;
  }
}
