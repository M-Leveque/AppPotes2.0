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
  private idsPhoto: Number[];
  private album: Album;
  private albumInfosSubscription:  Subscription;
  private albumPhotosSubscription: Subscription;
  private albumForm: FormGroup;
  private fileName: String;
  private b64Cover: any;

  private isUpdate = false;
  private disableValidate: boolean;

  constructor(
    private albumService: AlbumService,
    private photoService: PhotoService,
    private router: ActivatedRoute,
    private routerNav: Router,
    private formBuilder: FormBuilder,
    private constantService: ConstantService) { 

      this.album = new Album();
      this.photos = [];
      this.idsPhoto = [];
      this.fileName = "Ajouter une couverture";
      this.initForm();
    }

  /**
   * Initialisation of component.
   */
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
   * Refresh page.
   */
  refresh(){
    this.ngOnInit();
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

  resetPhotos(){
    this.clearTmpFiles();
    this.idsPhoto.length = 0;
  }

  handleFileSelect(evt, isCover){

    var files = evt.target.files;

    let callback = null

    // Define is the cover that should be set.
    if(isCover) callback = this.loadCover;
    else callback = this.loadPhoto;

    if (files) {

      // Browse file add
      for(let file of files){

        // Send img to backend
        this.sendFile(file, callback);
      }

    }
  }

  /**
   * This method send img 
   * to back for mass upload.
   * @param file 
   * @param callback 
   */
  sendFile(file: any, callback: any){

    // Read file add
    var reader = new FileReader();
    reader.onload = callback.bind(this);

    reader.readAsBinaryString(file);
  }

  /**
   * Convert cover img to base64 string.
   */
  loadCover(evt) {
    var binary = evt.target.result;
    let img = btoa(binary);
    this.b64Cover = img;
  }

  /**
   * Convert select photos to 
   * base64 string en store this
   * on tmp zone.
   * @param evt 
   */
  loadPhoto(evt) {
    var binary = evt.target.result;
    let img = btoa(binary);
    this.disableValidate = true;

    // Data of form
    let formData = new FormData();

    // Generate unique img id
    let id = this.generateID(10);

    // Prepare datas
    formData.append('file', img);
    formData.append('id', id);

    this.photoService.add(formData).subscribe( 
      response => {
        this.idsPhoto.push(response.id);
        this.disableValidate = false;
      }
    );
  }

  /**
   * Generate random id.
   * @param lenght 
   */
  generateID(lenght: Number){

    var id = "";

    for(var i=0; i< lenght; i++){
      id += Math.floor((Math.random() * 9) + 1).toString();
    }

    return id;
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
    formData.append('cover', this.b64Cover);

    // Add numbers of photos to back
    formData.append('ids-photo', JSON.stringify(this.idsPhoto));
    
    if(this.isUpdate){
      formData.append('id', this.album.id.toString());
    }

    this.albumService.storeAlbum(formData).subscribe( 
      (response) => {
        // Delete cache for update new photos
        this.routerNav.navigate(['album']);
      },
      (error) => {
        // TODO : Error case.
      }
    );
    
  }

  /**
   * Fonction to delete files
   * store in tmp.
   */
  clearTmpFiles(){
    if(this.idsPhoto) {
      for(let i=0; i < this.idsPhoto.length; i++){
        
        // Retreive index of tmpPhoto in photos array
        this.photoService.clearTmp(this.idsPhoto[i].toString())
        .subscribe(reponse => {
          let index = this.idsPhoto.findIndex((id) => id == this.idsPhoto[i])
          this.idsPhoto.splice(index, 1);
        });
      }
    }
  }

  /**
   * Fonction call to 
   * reset form
   */
  cancel(){
    this.clearTmpFiles();
    //this.routerNav.navigate(['album/'+this.album.id]);
  }

  ngOnDestroy() {
    if(this.router.snapshot.params){
      this.clearTmpFiles();
      this.albumInfosSubscription.unsubscribe();
      this.albumPhotosSubscription.unsubscribe();
    }
  }
 

}
