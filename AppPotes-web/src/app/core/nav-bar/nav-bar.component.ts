import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterState } from '@angular/router';
import { MobileService } from 'src/app/mobile.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public showAddMenu : boolean = false;
  public showMenu : boolean = false;

  constructor(
    public mobileService: MobileService
  ) { }

  ngOnInit(){
    this.mobileService.isMobileDevice(screen.width);
  }

  public displayAddMenu(){
    this.showAddMenu = !this.showAddMenu;
  }

  public displayMenu(){
    this.showMenu = !this.showMenu;
  }
}
