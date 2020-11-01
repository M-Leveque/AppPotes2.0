import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorComponent } from '../popup/error/error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  displayToggle : boolean;
  loginForm: FormGroup;

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private routerNav: Router,
    public dialog: MatDialog) {
    this.displayToggle = false;
   }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Form init
   */
  initForm(){
    this.loginForm = this.formBuilder.group({
      ident: '',
      password: ''
    });
  }

  validate() {
    // Data of form
    let formData = new FormData();
    let formValue = this.loginForm.value;  
        
    formData.append('email', formValue.ident);
    formData.append('password', formValue.password);

    this.loginService.login(formData).subscribe( 
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        // Redirect to login
        this.routerNav.navigate(['album']);
      },
      (error) => {
        console.log(error);
        var errors = {};
        if(error.status == 400){
          errors["code"] = 400;
          errors["label"] = "Mauvais login/mot de passe"
        }
        else {
          errors = error.error;
        }
        this.displayError(errors);
      }
    );
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

  showToggle(value : boolean){
    this.displayToggle = !this.displayToggle;
  }

}
