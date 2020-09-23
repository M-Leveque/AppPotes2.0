import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {PasswordDialogComponent} from './password-dialog/password-dialog.component';
import { PopupComponent } from 'src/app/core/popup/popup.component';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ConstantService } from 'src/app/constant.service';
import { User } from 'src/app/models/User.model';
import { Subscription } from 'rxjs';
import { Photo } from 'src/app/models/Photo.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PhotoService } from '../../photo/photo.service';

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
    private formBuilder: FormBuilder
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
      name: '',
      description: '',
      email: ''
    })
  }

  openCancel(): void {
    this.dialog.open(PopupComponent, {
      width: '450px',
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
      width: '450px',
      data: {
        title: "Confirmer", 
        msg: "Etes-vous sûr de vos modifications ?",
        callback: this.validate,
        context: this
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '800px',
      data: {}
    });
  }

  redirectToCompte(context: any): void {
    context.router.navigate(['account']);
  }

  getProfileCover(){
    return this.path.profiles+this.user.id+'.png'
  }

  updateProfileCover(cover: Photo){
    this.profileCover = cover;
  }

  validate(context: any){
    var formValues = context.userForm.value;
    context.user.name = formValues.name ? formValues.name : context.user.name;
    context.user.email = formValues.email ? formValues.email : context.user.email;
    context.user.description = formValues.description ? formValues.description : context.user.description;

    context.accountService.update(context.user).subscribe(
      (response) => {
        if(context.profileCover != undefined){
          context.profileCover.id_album = 2;
          context.photoService.add(context.profileCover).subscribe(
            (response) => {
              console.log(response);
            }
          )

        }
        //context.router.navigate(['account']);
      }
    )
  }

}
