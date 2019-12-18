import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/tabs/album/album.service';
import { ConstantService } from 'src/app/constant.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
})
export class AlbumListComponent implements OnInit {
  
  private host: String;

  private showInputSearch = false;
  
  private albumSubscription;
  private sharedAlbum = {};
  private albums = [];

  //Save for albums
  private allAlbums : any[];

  constructor(private albumService : AlbumService,
              private constantService: ConstantService
              ) { 
    this.allAlbums = this.albums;
  }

  ngOnInit() {

    this.host = this.constantService.host;

    this.albumSubscription = this.albumService.all()
    .subscribe( (albums) => {
      this.sharedAlbum = albums.shift();
      this.albums = albums;
    });  
  }


  public sort(value: String){
    this.albums.sort( (a, b) => {
      let v1 : any;
      let v2 : any;

      if(value === 'title'){
        v1 = a.title;
        v2 = b.title;
      }
      else{
        v1 = a.date;
        v2 = b.date;
      }

      if( v1 > v2 )
        return 1;
      if( v1 < v2)
        return -1;
      return 0
    });
  }

  public search(event : any){
    let searchText = event.target.value;

    searchText = searchText.toLowerCase();

    this.albums = this.allAlbums.filter( it => {
      return it.title.toLowerCase().includes(searchText);
    });
  }

  public setShowSearch(value: boolean){
    this.showInputSearch = value;
    this.albums = this.allAlbums;
  }

}
