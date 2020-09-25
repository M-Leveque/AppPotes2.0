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
import { ImageUtils } from 'src/app/core/utils/ImageUtils'

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
  private imageUtils: ImageUtils;

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
      this.imageUtils = new ImageUtils();
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
      this.cover.id_album = 0;
      this.cover.b64_image = this.imageUtils.formatSrcToB64Image(this.cover.b64_image);
      if(this.album.photo != null){
        this.updateCoverOnserver();
      }
      else {
        this.storeCoverOnserver();
      }
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

  storeCoverOnserver(){
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

  updateCoverOnserver(){
    this.photoService.update(this.cover, this.album.id_photo).subscribe(
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


  /**
   * Fonction for update album 
   * on server
   */
  updateAlbum($idCover){
    if($idCover != null) this.album.photo.id = $idCover
    /* Update Album */
    this.albumService.updateAlbum(this.album).subscribe( 
      (response) => {
        // Store photos
        this.storePhotos(this.album.id);
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
        this.storePhotos(response.id);
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
  storePhotos(idAlbum){
    var photosUpdate = this.photosToUpload.length > 0;
    if(photosUpdate){
      for(let photoToUpload of this.photosToUpload){
        photoToUpload.id_album = idAlbum;
        photoToUpload.b64_image = this.imageUtils.formatSrcToB64Image(photoToUpload.b64_image);
        this.photoService.add(photoToUpload).subscribe(
          (response) => { }
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
  delete(id, type){
    var currentContext = this;
    var callback = undefined;
    currentContext["idToDelete"] = id;

    if(type == "album"){
      callback = this.deleteAlbum;
    }
    else if(type == "photo"){
      callback = this.deletePhoto;
    }

    const dialogRef = this.dialog.open(PopupComponent, {
      width: '450px',
      data: {
        title: "Suppression", 
        msg: "Voulez-vous vraiment supprimer ?",
        callback: callback,
        context: currentContext

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteAlbum(context){
    context.albumService.delete(context.idToDelete)
    .subscribe(response => {
      // Delete cache for update new photos
      context.routerNav.navigate(['album']);
    });
  }

  deletePhoto(context){
    // Retreive index of photo in photos array
    var index = context.photos.findIndex((photo) => photo.id == context.idToDelete);
    if(index != -1) {
      // Send to delete photo
      context.photoService.delete(context.idToDelete)
        .subscribe(reponse => context.photos.splice(index, 1));
    }
  };

  getCover(){
    return this.albumService.getCovers(this.album);
  }

  ngOnDestroy() {
    if(this.isUpdate){
      this.albumInfosSubscription.unsubscribe();
      this.albumPhotosSubscription.unsubscribe();
    }
  }
}
