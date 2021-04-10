import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { PopupComponent } from 'src/app/core/popup/popup.component';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ConstantService } from 'src/app/constant.service';
import { User } from 'src/app/models/User.model';
import { Subscription } from 'rxjs';
import { Photo } from 'src/app/models/Photo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../../photo/photo.service';
import { ErrorComponent } from 'src/app/core/popup/error/error.component';

@Component({
  selector: 'app-account-option',
  templateUrl: './account-option.component.html',
})
export class AccountOptionComponent implements OnInit {

  private accountSubscription:  Subscription;
  private photoSubscription:  Subscription;

  private user: User;
  private userForm: FormGroup;
  private host: String;
  private path;
  private profileCover: Photo;

  constructor(
    public dialog: MatDialog, 
    public router: Router,
    private accountService : AccountService,
    private photoService : PhotoService,
    private constantService: ConstantService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.host = this.constantService.host;
    this.path = this.constantService.path;
    this.initForm();
    // Get connected user
    var cnxUserId = +localStorage.getItem("userId");
    if(cnxUserId){   
      this.accountSubscription = this.accountService.get(cnxUserId)
        .subscribe(user => this.user = user);  
    }
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(this.constantService.TEXT_FIELD_PATTERN)]],
      description: ['', [Validators.maxLength(255), Validators.pattern(this.constantService.TEXT_FIELD_PATTERN)]],
      email: ['', [Validators.maxLength(50), Validators.email]]
    })
  }

  openCancel(): void {
    this.dialog.open(PopupComponent, {
      width: '500px',
      data: {
        title: "Annuler les modifications", 
        msg: "Voulez-vous vraiment annuler vos modifications ?",
        callback: this.redirectToCompte,
        context: this
      },
    });
  }

  openConfirm(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '500px',
      data: {
        title: "Confirmer", 
        msg: "Etes-vous sûr de vos modifications ?",
        callback: this.validate,
        context: this
      },
    });
  }

  openPasswordDialog(): void {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '800px',
      data: {
        user: this.user, 
        callback: this.redirectToLoginPage,
        context: this
      },
    });
  }

  displayError(error){
    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '500px',
      data: {
        error: error, 
        callback: null,
        context: this
      },
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  redirectToCompte(context: any): void {
    context.router.navigate(['account']);
  }

  getProfileCover(){
      return this.user.photo;
  }

  updateProfileCover(cover: Photo){
    this.profileCover = cover;
  }

  validate(context: any){
    var formValues = context.userForm.value;
    context.user.name = formValues.name ? formValues.name : context.user.name;
    context.user.email = formValues.email ? formValues.email : context.user.email;
    context.user.description = formValues.description ? formValues.description : context.user.description;
    // Upload cover if user has select one.
    if(context.profileCover != undefined){
      context.profileCover.id_album = 2;
      // Update profil cover if user already has cover.
      if(context.user.photo != null ){
        context.updateCover();
      }
      // Store profile cover for user without cover
      else {
        context.storeCover();
      }
    }
    else {
      context.updateUser();
    }
  }

  storeCover(){
    this.photoService.add(this.profileCover).subscribe(
      (response) => {
        this.user.photo = response;
        this.updateUser();
      },
      (error) => {
        this.displayError(error.error);
      }
    )
  }

  updateCover(){
    this.photoService.update(this.profileCover, this.user.photo.id).subscribe(
      (response) => {
        this.user.photo = response;
        this.updateUser();
      },
      (error) => {
        this.displayError(error.error);
      }
    )
  }

  updateUser(){
    this.accountService.update(this.user).subscribe(
      (response) => {
        // Update user
        this.router.navigate(['account']);
      }, 
      (error) => {
        this.displayError(error.error);
      }
    )
  }

  disableValidate(){
    var formIsInvalid = this.userForm.status == "INVALID";
    var formIsUpdated = this.userForm.touched;
    return ( formIsInvalid && formIsUpdated );
  }

  redirectToLoginPage(context: any){
    context.router.navigate(['login']);
  }
}
