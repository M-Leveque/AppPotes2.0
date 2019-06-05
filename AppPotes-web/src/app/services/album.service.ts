import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class AlbumService {

  url:string= "http://127.0.0.1:8000/api/albums";
  private album = {};
  private error;

  public constructor(private http : HttpClient){}

  public all(){
    return this.http.get<any>(this.url);
  }

  public get(id : Number){
    return this.http.get<any>(this.url+"/infos/"+id);
  }

  public getPhotos(id : Number){
    return this.http.get<any>(this.url+"/"+id);
  }
}