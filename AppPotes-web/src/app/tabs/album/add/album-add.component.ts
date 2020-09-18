import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from './../album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConstantService } from 'src/app/constant.service';
import { Album } from 'src/app/models/Album.model';
import { PopupComponent } from 'src/app/core/popup/popup.component';
import { PhotoService } from 'src/app/tabs/photo/photo.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { Photo } from 'src/app/models/Photo.model';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
})
export class AlbumAddComponent implements OnInit {

  // Constants
  private host: String;
  private path: Object;

  // Local variables
  private photos: any[];
  private photosToUpload: Photo[];
  private cover: Photo;
  private album: Album;
  private albumInfosSubscription:  Subscription;
  private albumPhotosSubscription: Subscription;
  private albumForm: FormGroup;
  private fileName: String;

  private isUpdate = false;

  constructor(
    private albumService: AlbumService,
    private photoService: PhotoService,
    private router: ActivatedRoute,
    private routerNav: Router,
    private formBuilder: FormBuilder,
    private constantService: ConstantService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) { 

      this.album = new Album();
      this.photos = [];
      this.photosToUpload = [];
      this.cover = new Photo(0, null);
      this.fileName = "Ajouter une couverture";
      this.initForm();
    }

  /**
   * Initialisation of component.
   */
  ngOnInit() { 

    this.host = this.constantService.host;
    this.path = this.constantService.path;

    if(this.router.snapshot.params['id']){

      let idAlbum = this.router.snapshot.params['id'];

      if(idAlbum != undefined) {
        this.isUpdate = true;
      
        this.albumInfosSubscription = this.albumService.get(idAlbum)
          .subscribe(album => this.album = album[0]);  
  
        this.albumPhotosSubscription = this.photoService.getByAlbum(idAlbum)
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
      isPublic: [],
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
    if(index != -1) {
      // Send to delete photo
      this.photoService.delete(id)
        .subscribe(reponse => this.photos.splice(index, 1));
    }
  };

  /**
   * Function call when
   * User delete photo.
   * @param id 
   */
  deleteTmpPhoto(id){
    // Retreive index of photo in photos array
    var index = this.photosToUpload.findIndex((photo) => photo.id == id);
    if(index != -1) this.photosToUpload.splice(index,1);
  };

  /**
   * Event for cover updated
   * @param cover 
   */
  updateCover(cover: Photo){
    this.cover = cover;
  }

  /**
   * function call when
   * form is validate.
   * Send album data to backend.
   */
  validate(){

    // Start loader
    this.spinner.show();

    var coverUpdate =  this.cover.b64_image != null;
    
    // Update album
    let formValues = this.albumForm.value;
    this.album.name = formValues["name"] ? formValues["name"] : this.album.name;
    this.album.description = formValues["description"] ? formValues["description"] : this.album.description;
    this.album.date = formValues["date"] ? formValues["date"] : this.album.date;
    formValues["isPublic"] == "1" ? this.album.status = true : this.album.status = false;

    // Store cover
    if(coverUpdate){
      this.cover.id_album = 6;
      this.cover.b64_image = this.formatSrcToB64Image(this.cover.b64_image);
      this.photoService.add(this.cover).subscribe(
        (response) => {
          let id_cover = response.id;
          if(this.isUpdate){
            this.updateAlbum(id_cover);
          }
          else {
            this.storeAlbum(id_cover);
          }
        }
      )
    }
    else {
      if(this.isUpdate){
        this.updateAlbum(null);
      }
      else {
        this.storeAlbum(null);
      }
    }
  }

  /**
   * Fonction for update album 
   * on server
   */
  updateAlbum($idCover){
    if($idCover != null) this.album.id_photo = $idCover
    /* Update Album */
    this.albumService.updateAlbum(this.album).subscribe( 
      (response) => {
        // Store photos
        this.storePhotos();
        // Done loader
        this.spinner.hide();
        // Delete cache for update new photos
        this.routerNav.navigate(['album']);
      },
      (error) => {
        // Done loader
        this.spinner.hide();
      }
    );
  }

  /**
   * Fonction for store album 
   * on server
   */
  storeAlbum($idCover){
    
    if($idCover != null) this.album.id_photo = $idCover
    /* Update Album */
    this.albumService.storeAlbum(this.album).subscribe( 
      (response) => {
        // Store photos
        this.storePhotos();
        // Done loader
        this.spinner.hide();
        // Delete cache for update new photos
        this.routerNav.navigate(['album']);
      },
      (error) => {
        // Done loader
        this.spinner.hide();
      }
    );
  }

  /**
   * Strore new photos on server
   */
  storePhotos(){
    var photosUpdate = this.photosToUpload.length > 0;
    if(photosUpdate){
      for(let photoToUpload of this.photosToUpload){
        photoToUpload.id_album = this.album.id;
        photoToUpload.b64_image = this.formatSrcToB64Image(photoToUpload.b64_image);
        this.photoService.add(photoToUpload).subscribe(
          (response) => {
            console.log("Photo : " + photoToUpload.name + " is upload");
          }
        )
      }
    }
  }

  /**
   * Fonction call to 
   * reset form
   */
  cancel(){
    this.routerNav.navigate(['album/'+this.album.id]);
  }

  
  /**
   * Fonction call to 
   * reset form
   */
  delete(){
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '450px',
      data: {
        title: "Suppression de l'album", 
        msg: "Voulez-vous vraiment supprimer cet album ?",
        callback: this.deleteAlbum,
        context: this

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteAlbum(context){
    context.albumService.delete(context.album.id)
    .subscribe(response => console.log(response));
  }

  getCover(){
    return this.albumService.getCovers(this.album);
  }

  formatSrcToB64Image(b64_image){
    var b64 = "";
    var baliseb64 = "base64";
    var indexStart = b64_image.indexOf(baliseb64);
    if(b64 != null){
      b64 = b64_image.substring(indexStart + baliseb64.length);
    }
    return b64;
  }

  ngOnDestroy() {
    if(this.isUpdate){
      this.albumInfosSubscription.unsubscribe();
      this.albumPhotosSubscription.unsubscribe();
    }
  }
}
