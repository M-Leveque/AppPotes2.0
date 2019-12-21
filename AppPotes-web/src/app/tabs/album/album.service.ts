import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotoService } from '../photo/photo.service';
import { Album } from '../../models/Album.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AlbumService {

  url:string= "http://127.0.0.1:8000/api/albums";
  private album = {};
  private error;

  public constructor(private http : HttpClient){}

  public all(){
    return this.http.get<any>(this.url);
  }

  public get(id : Number) : Observable<any>{
    return this.http.get<any>(this.url+"/infos/"+id);
  }

  public getPhotos(id : Number) : Observable<any>{
    return this.http.get<any>(this.url+"/"+id);
  }

  public storeAlbum(album: any) : Observable<any>{
    return this.http.post<any>(this.url, album);
  }
}