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
    var dialogError = this.dialog.open(ErrorComponent, {
      width: '450px',
      data: {
        error: error, 
        callback: null,
        context: this
      },
    });
    dialogError.afterClosed().subscribe(result => {});
  }

  onValidate(): void {
    if(this.passwdForm.status != 'INVALID'){
      var formValues = this.passwdForm.value;
      if(formValues.newPassword == formValues.newPassword2){
        var objPassword = {
          "password": formValues.newPassword,
          "oldPassword": formValues.oldPassword
        }
        this.accountService.updatePassword(objPassword, this.data.user.id).subscribe(
          (response)=>{
            this.data.doAfterValidation(this.context);
            this.dialogRef.close();
          },
          (error) => {
            this.displayError(error.error);
          }
        );
      }
    }
  }
}
