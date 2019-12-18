import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from './../album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConstantService } from 'src/app/constant.service';
import { Album } from 'src/app/models/Album.model';
import { PhotoService } from 'src/app/tabs/photo/photo.service';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
})
export class AlbumAddComponent implements OnInit {

  // Constants
  private host: String;

  // Local variables
  private photos: any[];
  private album: Album;
  private albumInfosSubscription:  Subscription;
  private albumPhotosSubscription: Subscription;
  private albumForm: FormGroup;
  private fileName: String;
  private file: any;

  private isUpdate = false;

  constructor(
    private albumService: AlbumService,
    private photoService: PhotoService,
    private router: ActivatedRoute,
    private routerNav: Router,
    private formBuilder: FormBuilder,
    private constantService: ConstantService) { 

      this.album = new Album();
      this.photos = [];
      this.fileName = "Ajouter une couverture";
      this.initForm();
    }

  ngOnInit() { 

    this.host = this.constantService.host;

    if(this.router.snapshot.params){

      let idAlbum = this.router.snapshot.params['id'];

      if(idAlbum != undefined) {
        this.isUpdate = true;
      
        this.albumInfosSubscription = this.albumService.get(idAlbum)
          .subscribe(album => this.album = album);  
  
        this.albumPhotosSubscription = this.albumService.getPhotos(idAlbum)
          .subscribe(photos => this.photos = photos);
      }
    }
  }

  /**
   * Form init
   */
  initForm(){
    this.albumForm = this.formBuilder.group({
      name: '',
      description: '',
      date: ''
    });
  }

  /**
   * Function call when
   * User delete photo.
   * @param id 
   */
  deletePhoto(id){
    // Retreive index of photo in photos array
    var index = this.photos.findIndex((photo) => photo.id == id);
    // Send to delete photo
    this.photoService.delete(id)
      .subscribe(reponse => this.photos.splice(index, 1));
  };

  /**
   * Funcion call
   * When file is selected
   * @param event 
   */
  onFileChange(event){
    if(event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      this.fileName = file.name;
      this.file = file;
    }
  }
  
  refresh(){
    this.ngOnInit();
  }

  /**
   * function call when
   * form is validate.
   * Send album data to backend.
   */
  validate(){

    // Data of form
    let formData = new FormData();
    let formValue = this.albumForm.value;  

    let name = (formValue.name ? formValue.name : this.album.name);
    let description = (formValue.description ? formValue.description : this.album.description);

    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', this.file);

    if(this.isUpdate){
      formData.append('id', this.album.id.toString());
    }

    this.albumService.storeAlbum(formData).subscribe( 
      (response) => this.routerNav.navigate(['album/'+this.album.id]),
      (error) => {
        // TODO : Error case.
      }
    );
    
  }

  /**
   * Fonction call to 
   * reset form
   */
  cancel(){
    this.routerNav.navigate(['album/'+this.album.id]);
  }

  ngOnDestroy() {
    if(this.router.snapshot.params){
      this.albumInfosSubscription.unsubscribe();
      this.albumPhotosSubscription.unsubscribe();
    }
  }
 

}
