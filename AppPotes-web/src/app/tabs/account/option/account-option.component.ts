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

@Component({
  selector: 'app-account-option',
  templateUrl: './account-option.component.html',
})
export class AccountOptionComponent implements OnInit {

  private accountSubscription:  Subscription;

  private user: User;
  private host: String;
  private path;
  private profileCover: Photo;

  constructor(
    public dialog: MatDialog, 
    public router: Router,
    private accountService : AccountService,
    private constantService: ConstantService
  ) { }

  ngOnInit() {
    this.host = this.constantService.host;
    this.path = this.constantService.path;
    // Get connected user
    var cnxUserId = +localStorage.getItem("userId");
    if(cnxUserId){   
      this.accountSubscription = this.accountService.get(cnxUserId)
        .subscribe(user => this.user = user);  
    }
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
        callback: this.redirectToCompte,
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
    return this.path.profiles+this.user.id+'.jpg'
  }

  updateProfileCover(cover: Photo){
    this.profileCover = cover;
  }

}
