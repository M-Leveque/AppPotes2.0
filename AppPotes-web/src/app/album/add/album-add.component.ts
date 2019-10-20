import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from './../../services/album.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConstantService } from 'src/app/services/constant.service';
import { Album } from 'src/app/models/Album.model';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
})
export class AlbumAddComponent implements OnInit {

  private host: String;

  private photos: any[];
  private album: Album;
  private albumInfosSubscription:  Subscription;
  private albumPhotosSubscription: Subscription;
  private albumForm: FormGroup;

  constructor(
    private albumService: AlbumService,
    private photoService: PhotoService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private constantService: ConstantService) { }

  ngOnInit() { 

    this.host = this.constantService.host;

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

  deletePhoto(id){
    console.log("componenet delete" + id);
    this.photoService.delete(id)
      .subscribe(reponse => console.log(reponse)); 

    this.refresh();
  };
  
  refresh(){
    this.ngOnInit();
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
