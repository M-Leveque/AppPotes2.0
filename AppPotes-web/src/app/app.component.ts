import { Component, OnInit } from '@angular/core';
import { User } from './models/User.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  public user = new User(0, null, null);
  title = 'AppPotes-web';
}
