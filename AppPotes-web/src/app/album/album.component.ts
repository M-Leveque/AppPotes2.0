import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  public albums : Array<object>;

  constructor() { 
    this.albums = [
      {
        "titre" : "Album1",
        "src"   : "img01.png"
      },
      {
        "titre" : "Album2",
        "src"   : "img02.png"
      },
      {
        "titre" : "Album3",
        "src"   : "img03.png"
      }
    ];
  }

  ngOnInit() {
  }

}
