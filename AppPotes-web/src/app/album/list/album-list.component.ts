import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
})
export class AlbumListComponent implements OnInit {

  sharedAlbum = {
    id: 0,
    title: 'Album commun',
    path: 'vrac.jpg'
  }

  albums = [
    {
      id: 1,
      title: 'Randonnée',
      path: 'montagne.jpg'
    },
    {
      id: 2,
      title: 'Concert',
      path: 'pink-floyd.jpg'
    },
    {
      id: 3,
      title: 'Vancance 2016',
      path: 'plage.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
