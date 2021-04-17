import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from './account.service';
import { User } from 'src/app/models/User.model';
import { ConstantService } from 'src/app/constant.service';
import { Router } from '@angular/router';
import { AlbumService } from '../album/album.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  private accountSubscription:  Subscription;
  private albumSubscription: Subscription;

  public user: User;
  public albums = [];
  private host: String;

  constructor(
    private accountService : AccountService,
    private albumService : AlbumService,
    private constantService: ConstantService,
    private photoService: PhotoService,
    private routerNav: Router
  ) {}

  ngOnInit() {

    this.host = this.constantService.host;
    // Get connected user
    var cnxUserId = +localStorage.getItem("userId");
    if(cnxUserId){   
      this.accountSubscription = this.accountService.get(cnxUserId)
        .subscribe((user) => {
          this.user = user;
          this.initProfileCover();
        });  
    }
    this.albumSubscription = this.albumService.allCreatedByUser().subscribe( (albums) => {
      this.albums = albums;
      this.initAlbumsCover();
    });  
  }

  initProfileCover(){
    var context = this;
    if(this.user && this.user.photo){
      this.photoService.get64File(this.user.photo.id, true).subscribe(
        (file) => {
          context.user.photo.b64_image = file;
        }
      );
    }else {
      this.user.photo.b64_image = this.constantService.path.photos.default;
    }
  }

  initAlbumsCover(){
    for(var album of this.albums){
      this.initAlbumCover(album);
    }
  }

  initAlbumCover(album){
    if(album && album.photo){
      this.photoService.get64File(album.photo.id, true).subscribe(
        (file) => {
          album.photo.b64_image = file;
        }
      );
    }else {
      album.photo = {};
      album.photo.b64_image = this.constantService.path.photos.default;
    }
  }

  logout(){
    localStorage.setItem("token", undefined);
    localStorage.setItem("userId", undefined);
    // Redirect to login
    this.routerNav.navigate(['/login']);
  }

}