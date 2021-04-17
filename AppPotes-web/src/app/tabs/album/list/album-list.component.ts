import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/tabs/album/album.service';
import { ConstantService } from 'src/app/constant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PhotoService } from '../../photo/photo.service';
import { Photo } from 'src/app/models/Photo.model';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
})
export class AlbumListComponent implements OnInit {
  
  public host: String;
  public path: Object;
  public searchText;

  public showInputSearch = false;
  public selected = "";
  
  public albumSubscription;
  public sharedAlbum: any;
  public albums = [];

  //Save for albums
  public allAlbums : any[];

  constructor(private albumService : AlbumService,
              private photoService : PhotoService,
              private constantService: ConstantService,
              private spinner: NgxSpinnerService) { 
  }

  ngOnInit() {

    this.host = this.constantService.host;
    this.path = this.constantService.path;
    
    this.spinner.show();

    this.albumSubscription = this.albumService.all()
    .subscribe( (albums) => {
      for(let album of albums){
        if (album.id == 1) this.sharedAlbum = album;
      }
      this.albums = albums;
      this.allAlbums = this.albums;
      this.initCovers();
      this.spinner.hide();
    });  
  }


  public sort(value){
    this.albums.sort( (a, b) => {
      let v1 : any;
      let v2 : any;

      if(value === 'name'){
        v1 = a.name;
        v2 = b.name;
      }
      else{
        // convert date to epoch format
        v1 = new Date(a.date_created).getTime() / 1000;
        v2 = new Date(b.date_created).getTime() / 1000;
      }

      if( v1 > v2 )
        return 1;
      if( v1 < v2)
        return -1;
      return 0
    });
  }

  public search(event : any){
    this.searchText = event.target.value.toLowerCase();
    
    this.albums = this.allAlbums.filter( it => {
      return it.name.toLowerCase().includes(this.searchText);
    });
  }

  public setShowSearch(value: boolean){
    this.showInputSearch = value;
    this.albums = this.allAlbums;
  }

  initCovers(){
    for(var album of this.albums){
      this.initCover(album);
    }
  }

  initCover(album){
    if(album.photo != null){
      this.photoService.get64File(album.photo.id, true).subscribe(
        (file) => {
          album.photo.b64_image = file;
        }
      );
    }
    else {
      album.photo = new Photo();
      album.photo.b64_image = this.constantService.path.photos.default;
    }
  }

}
