import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  displayToggle : boolean;

  constructor() {
    this.displayToggle = false;
   }

  ngOnInit() {
  }

  public showToggle(value : boolean){
    if(value){
      this.displayToggle = true;
    }
    else{
      this.displayToggle = false;
    }
  }

}
