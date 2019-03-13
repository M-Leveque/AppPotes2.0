import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
})
export class AlbumListComponent implements OnInit {

  showInputSearch = false;

  //Album shared
  sharedAlbum = {
    id: 0,
    title: 'Album commun',
    path: 'vrac.jpg',
    date: '2015-06-15'
  }

  //Albums 
  albums = [
    {
      id: 1,
      title: 'Randonnée 2018',
      path: 'montagne.jpg',
      date: '2018-06-14'
    },
    {
      id: 2,
      title: 'Concert 2017',
      path: 'pink-floyd.jpg',
      date: '2017-06-13'
    },
    {
      id: 3,
      title: 'Vancance 2016',
      path: 'plage.jpg',
      date: '2016-06-12'
    }
  ];

  //Save for albums
  allAlbums : any[];

  constructor() { 
    this.allAlbums = this.albums;
  }

  ngOnInit() {
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
