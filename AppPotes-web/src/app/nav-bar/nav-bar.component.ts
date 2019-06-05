import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  private showMenu : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public displayMenu(){
    this.showMenu ? this.showMenu = false : this.showMenu = true;
  }

}
