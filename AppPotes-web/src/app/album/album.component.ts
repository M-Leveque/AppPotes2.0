import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  album = {
    id: 0,
    title: 'Album commun',
    path: 'vrac.jpg'
  }

  pictures = [
    {
      id: 0,
      path: 'img01.jpg'
    },
    {
      id: 1,
      path: 'img02.jpg'
    },
    {
      id: 2,
      path: 'img03.jpg'
    },
    {
      id: 3,
      path: 'img04.jpg'
    }
  ]

  constructor() {}

  ngOnInit() {
  }

}
