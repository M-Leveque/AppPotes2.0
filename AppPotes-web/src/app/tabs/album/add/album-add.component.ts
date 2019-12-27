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
  private idCover: Number[];
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
      this.idsPhoto = [];
      this.idCover = [];
      this.fileName = "Ajouter une couverture";
      this.initForm();
    }

  /**
   * Initialisation of component.
   */
  ngOnInit() { 

    this.host = this.constantService.host;

    if(this.router.snapshot.params['id']){

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

  /**
   * function call when
   * form is validate.
   * Send album data to backend.
   */
  validate(){

    // Start loader
    this.spinner.show();

    // Data of form
    let formData = new FormData();
    let formValue = this.albumForm.value;  

    // Check if value's update.
    let name = (formValue.name ? formValue.name : this.album.name);
    let description = (formValue.description ? formValue.description : this.album.description);
    let idCover = (this.idCover[0] ? this.idCover[0].toString() : undefined);

    formData.append('name', name);
    formData.append('description', description);
    formData.append('id-cover', idCover);

    // Add numbers of photos to back
    formData.append('ids-photo', JSON.stringify(this.idsPhoto));
    
    if(this.isUpdate){
      formData.append('id', this.album.id.toString());
    }

    this.albumService.storeAlbum(formData).subscribe( 
      (response) => {
        // Done loader
        this.spinner.hide();
        // Delete cache for update new photos
        this.routerNav.navigate(['album']);
      },
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
    this.photoService.clearTmpFiles(this.idsPhoto);
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
    console.log("delete album");
    context.albumService.delete(context.album.id)
    .subscribe(response => console.log(response));
  }

  ngOnDestroy() {
    if(this.isUpdate){
      this.photoService.clearTmpFiles(this.idsPhoto);
      this.albumInfosSubscription.unsubscribe();
      this.albumPhotosSubscription.unsubscribe();
    }
  }
 

}
