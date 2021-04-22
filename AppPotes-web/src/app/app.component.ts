import { Component, HostListener, OnInit } from '@angular/core';
import { MobileService } from './mobile.service';
import { User } from './models/User.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  public user = new User(0, null, null);
  title = 'AppPotes-web';

  constructor(
    public mobileService: MobileService
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobileService.isMobileDevice(event.target.innerWidth);
  }
}
