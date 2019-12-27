import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/tabs/album/album.service';
import { ConstantService } from 'src/app/constant.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
})
export class AlbumListComponent implements OnInit {
  
  private host: String;

  private showInputSearch = false;
  private selected = "";
  
  private albumSubscription;
  private sharedAlbum = {};
  private albums = [];

  //Save for albums
  private allAlbums : any[];

  constructor(private albumService : AlbumService,
              private constantService: ConstantService,
              private spinner: NgxSpinnerService
              ) { 
  }

  ngOnInit() {

    this.host = this.constantService.host;
    this.spinner.show();

    this.albumSubscription = this.albumService.all()
    .subscribe( (albums) => {
      this.sharedAlbum = albums.shift();
      this.albums = albums;
      this.allAlbums = this.albums;
      this.spinner.hide();
    });  
  }


  public sort(value: String){
    this.albums.sort( (a, b) => {
      let v1 : any;
      let v2 : any;

      if(value === 'name'){
        v1 = a.name;
        v2 = b.name;
      }
      else{
        // convert date to epoch format
        v1 = new Date(a.date).getTime() / 1000;
        v2 = new Date(b.date).getTime() / 1000;
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
      return it.name.toLowerCase().includes(searchText);
    });
  }

  public setShowSearch(value: boolean){
    this.showInputSearch = value;
    this.albums = this.allAlbums;
  }

}
