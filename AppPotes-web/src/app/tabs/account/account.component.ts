import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from './account.service';
import { User } from 'src/app/models/User.model';
import { ConstantService } from 'src/app/constant.service';
import { Router } from '@angular/router';
import { AlbumService } from '../album/album.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  private accountSubscription:  Subscription;
  private albumSubscription: Subscription;

  public user: User;
  private albums = [];
  private host: String;
  private path;

  constructor(
    private accountService : AccountService,
    private albumService : AlbumService,
    private constantService: ConstantService,
    private routerNav: Router
  ) {}

  ngOnInit() {

    this.host = this.constantService.host;
    this.path = this.constantService.path;
    // Get connected user
    var cnxUserId = +localStorage.getItem("userId");
    if(cnxUserId){   
      this.accountSubscription = this.accountService.get(cnxUserId)
        .subscribe(user => this.user = user);  
    }
    this.albumSubscription = this.albumService.allCreatedByUser()
    .subscribe( (albums) => {
      this.albums = albums;
    });  
  }

  getProfileCover(){
    if(this.user && this.user.photo != null){
      return this.user.photo.path_thumb;
    }
    return 'storage/img/albums/default.jpg';
  }

  public getCover(album){
    return this.albumService.getCovers(album);
  }

  logout(){
    localStorage.setItem("token", undefined);
    localStorage.setItem("userId", undefined);
    // Redirect to login
    this.routerNav.navigate(['/login']);
  }

}