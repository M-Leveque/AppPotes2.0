import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConstantService } from 'src/app/constant.service';

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
    private constant: ConstantService) {
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
        console.log(response);
        localStorage.setItem('token', response);
      },
      (error) => {
        // TODO : Error case.
      }
    );
  }

  showToggle(value : boolean){
    this.displayToggle = !this.displayToggle;
  }

}
