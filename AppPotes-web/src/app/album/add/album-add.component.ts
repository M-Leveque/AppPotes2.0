import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from './../../services/album.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
})
export class AlbumAddComponent implements OnInit {

  private photos: any[];
  private album:  any;
  private albumInfosSubscription:  Subscription;
  private albumPhotosSubscription: Subscription;
  private albumForm: FormGroup; 

  constructor(
    private albumService: AlbumService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() { 

    this.initForm();

    if(this.router.snapshot.params){

      let idAlbum = this.router.snapshot.params['id'];

      this.albumInfosSubscription = this.albumService.get(idAlbum)
        .subscribe(album => this.album = album);  

      this.albumPhotosSubscription = this.albumService.getPhotos(idAlbum)
        .subscribe(photos => this.photos = photos);
    }    
  }

  initForm(){
    this.albumForm = this.formBuilder.group({
      name: '',
      description: '',
      date: '',
      artwork: '',
      photo: [],
    });
  }

  validate(){
    console.log(this.album);
    console.log(this.photos);
  }

  cancel(){}

  ngOnDestroy() {
    if(this.router.snapshot.params){
      this.albumInfosSubscription.unsubscribe();
      this.albumPhotosSubscription.unsubscribe();
    }
  }

}
