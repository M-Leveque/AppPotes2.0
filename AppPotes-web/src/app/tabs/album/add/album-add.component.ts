import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from './../album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ConstantService } from 'src/app/constant.service';
import { Album } from 'src/app/models/Album.model';
import { PopupComponent } from 'src/app/core/popup/popup.component';
import { PhotoService } from 'src/app/tabs/photo/photo.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { Photo } from 'src/app/models/Photo.model';
import { ErrorComponent } from 'src/app/core/popup/error/error.component';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
})
export class AlbumAddComponent implements OnInit {

  // Local variables
  private host: String;
  private path: Object;
  private photos: any[];
  private photosToUpload: Photo[];
  private cover: Photo;
  private album: Album;
  private albumInfosSubscription:  Subscription;
  private albumPhotosSubscription: Subscription;
  private albumForm: FormGroup;
  private fileName: String;

  private isUpdate = false;
  private coverUpdate = false;

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
          .subscribe((album) => {
            this.album = album[0];
            this.initForm();
          });  
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
    var name = this.album.name ? this.album.name : "";
    var description = this.album.description ? this.album.description : "";
    this.albumForm = this.formBuilder.group({
      name: [name, [Validators.required, Validators.maxLength(25), Validators.pattern(this.constantService.TEXT_FIELD_PATTERN)]],
      description: [description, [Validators.maxLength(255), Validators.pattern(this.constantService.TEXT_FIELD_PATTERN)]],
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

  disableValidate(){
    var formIsInvalid = this.albumForm.status == "INVALID";
    var formIsUpdated = this.albumForm.touched;
    return ( formIsInvalid && formIsUpdated );
  }

  /**
   * function call when
   * form is validate.
   * Send album data to backend.
   */
  validate(){
    // Start loader
    this.spinner.show();

    this.coverUpdate =  this.cover.b64_image != null;
    
    // Update album
    let formValues = this.albumForm.value;
    this.album.name = formValues["name"] ? formValues["name"] : this.album.name;
    this.album.description = formValues["description"] ? formValues["description"] : this.album.description;
    this.album.date = formValues["date"] ? formValues["date"] : this.album.date;
    formValues["isPublic"] == "1" ? this.album.status = true : this.album.status = false;

    // Store cover
    if(this.coverUpdate){
      this.cover.id_album = 0;
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
      },
      (error) => {
        this.displayError(error.error);
        // Done loader
        this.spinner.hide();
      }
    )
  }
  
  updateCoverOnserver(){
    this.photoService.update(this.cover, this.album.id_photo).subscribe(
      (response) => {
        var idcover = response.id;
        if(this.isUpdate){
          this.updateAlbum(idcover);
        }
        else {
          this.storeAlbum(idcover);
        }
      },
      (error) => {
        this.displayError(error.error);
        // Done loader
        this.spinner.hide();
      }
    )
  }


  /**
   * Fonction for update album 
   * on server
   */
  updateAlbum(idCover){
    if(idCover != null) this.album.id_photo = idCover
    /* Update Album */
    this.albumService.updateAlbum(this.album).subscribe( 
      (response) => {
        // Store photos
        this.storePhotos(this.album.id);
      },
      (error) => {
        // Delete upload cover
        if(this.coverUpdate){
          this.photoService.delete(idCover).subscribe(() => {this.resetCover()});
        }
        this.displayError(error.error);
        // Done loader
        this.spinner.hide();
      }
    );
  }

  /**
   * Fonction for store album 
   * on server
   */
  storeAlbum(idCover){
    
    if(idCover != null) this.album.id_photo = idCover
    /* Update Album */
    this.albumService.storeAlbum(this.album).subscribe( 
      (response) => {
        // Store photos
        this.storePhotos(response.id);
      },
      (error) => {
        // Delete upload cover
        if(this.coverUpdate){
          this.photoService.delete(idCover).subscribe(() => {this.resetCover()});
        }
        this.displayError(error.error);
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
        this.photoService.add(photoToUpload).subscribe(
          (response) => {
            // Done loader
            this.spinner.hide();
            // Delete cache for update new photos
            this.routerNav.navigate(['album']);
           },
          (error) => {
            this.displayError(error.error);
            // Done loader
            this.spinner.hide();
          }
        )
      }
    }
    else {
      // Done loader
      this.spinner.hide();
      // Delete cache for update new photos
      this.routerNav.navigate(['album']);
    }
  }

  /**
   * Display error msg
   */
  displayError(error){

    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '450px',
      data: {
        error: error, 
        callback: null,
        context: this

      },
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  /**
   * display old cover or default
   */
  resetCover(){
    this.cover.b64_image = null
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

    dialogRef.afterClosed().subscribe(result => {});
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
