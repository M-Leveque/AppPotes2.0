import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantService } from 'src/app/constant.service';

@Injectable()
export class AlbumService {
  
  httpOptions = {};
  basePath:string= "api/albums";

  public constructor(
    private http : HttpClient,
    private constant: ConstantService
  ){}

  public all(){
    return this.http.get<any>(this.constant.host+this.basePath, this.httpOptions);
  }

  public allCreatedByUser(){
    return this.http.get<any>(this.constant.host+this.basePath+"/byUser", this.httpOptions);
  }

  public get(id : Number) : Observable<any>{
    return this.http.get<any>(this.constant.host+this.basePath+"/"+id, this.httpOptions);
  }

  public getCovers(album){
    if(album.photo == null){
      return 'storage/img/albums/default.jpg';
    }
    return album.photo.path;
  }

  public getPhotos(id : Number) : Observable<any>{
    return this.http.get<any>(this.constant.host+this.basePath+"/"+id, this.httpOptions);
  }

  public storeAlbum(album: any) : Observable<any>{
    return this.http.post<any>(this.constant.host+this.basePath, album, this.httpOptions);
  }

  public updateAlbum(album: any) : Observable<any>{
    return this.http.put<any>(this.constant.host+this.basePath+"/"+album.id, album, this.httpOptions);
  }

  public delete(id: Number) : Observable<any>{
    return this.http.delete<any>(this.constant.host+this.basePath+"/"+id, this.httpOptions);
  }
}