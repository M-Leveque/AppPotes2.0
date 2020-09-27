import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantService } from 'src/app/constant.service';
import { User } from 'src/app/models/User.model';

@Injectable()
export class AccountService {
  
  httpOptions = {};
  url:string= "http://127.0.0.1:8000/api/users";
  private album = {};
  private error;

  public constructor(
    private http : HttpClient,
    private constant: ConstantService
  ){}

  public all(){
    return this.http.get<any>(this.url, this.httpOptions);
  }

  public get(id : Number) : Observable<any>{
    return this.http.get<any>(this.url+"/"+id, this.httpOptions);
  }

  public update(user : User) : Observable<any>{
    return this.http.put<any>(this.url+"/"+user.id, user, this.httpOptions);
  }

  public updatePassword(passwdObj: any, userId: Number): Observable<any>{
    return this.http.put<any>(this.url+"/"+userId+"/update/password", passwdObj, this.httpOptions);
  }

}