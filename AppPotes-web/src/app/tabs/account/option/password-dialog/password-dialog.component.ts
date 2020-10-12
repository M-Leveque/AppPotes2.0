import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from './password-dialog-data.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../../account.service';
import { ErrorComponent } from 'src/app/core/popup/error/error.component';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.sass']
})
export class PasswordDialogComponent implements OnInit {

   public passwdForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.initForm();
    }

  ngOnInit() {
  }

  initForm(){
    this.passwdForm = this.formBuilder.group({
      oldPassword: '',
      newPassword: '',
      newPassword2: ''
    })
  }

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

  onCancel(): void {
    this.dialogRef.close();
  }

  onValidate(): void {
    var formValues = this.passwdForm.value;
    if(formValues.newPassword == formValues.newPassword2){
      var objPassword = {
        "password": formValues.newPassword,
        "oldPassword": formValues.oldPassword
      }
      this.accountService.updatePassword(objPassword, this.data.user.id).subscribe(
        (response)=>{
          this.dialogRef.close();
        },
        (error) => {
          this.displayError(error.error);
        }
      );
    }
  }

}
