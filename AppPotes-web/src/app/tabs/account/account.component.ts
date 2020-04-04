import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from './account.service';
import { User } from 'src/app/models/User.model';
import { ConstantService } from 'src/app/constant.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  private accountSubscription:  Subscription;

  private user: User;
  private host: String;

  constructor(private accountService : AccountService,
    private constantService: ConstantService) {}

  ngOnInit() {

    this.host = this.constantService.host;
    // Get connected user
    var cnxUserId = +localStorage.getItem("userId");
    if(cnxUserId){   
      this.accountSubscription = this.accountService.get(cnxUserId)
        .subscribe(user => this.user = user);  
    }
  }



}
