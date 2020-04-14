import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {PasswordDialogComponent} from './password-dialog/password-dialog.component';
import { PopupComponent } from 'src/app/core/popup/popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-option',
  templateUrl: './account-option.component.html',
})
export class AccountOptionComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    public router: Router
  ) { }

  ngOnInit() {
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

}
