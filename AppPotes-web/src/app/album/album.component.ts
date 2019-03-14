import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from './../services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  album : any;
  pictures : any[];

  constructor(private albumService: AlbumService, private router: ActivatedRoute ) {}

  ngOnInit() {
    let idAlbum = this.router.snapshot.params['id'];
    this.album = this.albumService.get(idAlbum);
    this.pictures = this.album.pictures;
  }

}
