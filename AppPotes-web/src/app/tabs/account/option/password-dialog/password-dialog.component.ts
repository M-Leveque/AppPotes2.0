import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from './password-dialog-data.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../account.service';
import { ErrorComponent } from 'src/app/core/popup/error/error.component';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.sass']
})
export class PasswordDialogComponent implements OnInit {

   public passwdForm : FormGroup;
   public context: any;

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.initForm();
      this.context = this.data.context;
    }

  ngOnInit() {
  }

  initForm(){
    this.passwdForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPassword2: ['', [Validators.required]]
    }, {validator: this.checkPasswords })
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('newPassword2').value;

    return pass === confirmPass ? null : { notSame: true }     
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
          this.data.callback(this.context);
          this.dialogRef.close();
        },
        (error) => {
          this.displayError(error.error);
        }
      );
    }
  }

  disableValidate(){
    var formIsInvalid = this.passwdForm.status == "INVALID";
    var formIsUpdated = this.passwdForm.touched;
    return ( formIsInvalid && formIsUpdated );
  }

}
