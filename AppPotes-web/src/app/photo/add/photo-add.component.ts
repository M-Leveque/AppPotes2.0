import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Photo } from 'src/app/models/Photo.model';
import { PhotoService } from 'src/app/services/photo.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { ConstantService } from 'src/app/services/constant.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Component for add new 
 * photo in app.
 */
@Component({
  selector: 'app-photo-add',
  templateUrl: './photo-add.component.html',
})
export class PhotoAddComponent implements OnInit {

  private photoSubscription : Subscription;
  private host: String;

  idAlbum: any;

  photoForm : FormGroup; 
  visuel : String;
  fileName : String;
  file: any;

  constructor( private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: ActivatedRoute,
    private routerNav: Router,
    private constantService: ConstantService ) { }
  
  /**
   * On initialisation of 
   * component.
   */
  ngOnInit() { 
    this.host = this.constantService.host;

    this.initForm();

    if(this.router.snapshot.params){

      // Get id of album
      this.idAlbum = this.router.snapshot.params['idAlbum'];
    } 
  }

  /**
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

  /**
   * Initialisation
   * of form.
   */
  initForm(){
    this.photoForm = this.formBuilder.group({
      path: '',
      name: '',
      date: ''
    });
    this.fileName = "Ajouter une photo";
  }

  /**
   * Validate form
   */
  validate(){

    // Data of form
    let formValue = this.photoForm.value;
    let formData = new FormData();

    formData.append('id', this.idAlbum);
    formData.append('file', this.file);
    formData.append('name', formValue['name']);
    formData.append('date', formValue['date']);

    this.photoService.add(formData).subscribe( 
      response => this.routerNav.navigate(['album-add/'+this.idAlbum])
    );
   }



   /**
    * Cancel all value
    */
  cancel(){ 
    this.initForm();
  }

  ngOnDestroy() { }

}
