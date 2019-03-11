import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
})
export class AlbumListComponent implements OnInit {

  sharedAlbum = {
    id: 0,
    title: 'Album commun',
    path: 'vrac.jpg',
    date: '2015-06-15'
  }

  albums = [
    {
      id: 1,
      title: 'Randonnée',
      path: 'montagne.jpg',
      date: '2015-06-14'
    },
    {
      id: 2,
      title: 'Concert',
      path: 'pink-floyd.jpg',
      date: '2015-06-13'
    },
    {
      id: 3,
      title: 'Vancance 2016',
      path: 'plage.jpg',
      date: '2015-06-12'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  public sortByTitle(){
    this.albums.sort( (a, b) => {
      if( a.title > b.title )
        return 1;
      if( a.title < b.title)
        return -1;
      return 0
    });
  }

  public sortByDate(){
    this.albums.sort( (a, b) => {
      if( a.date > b.date )
        return 1;
      if( a.date < b.date)
        return -1;
      return 0
    });
  }

}
