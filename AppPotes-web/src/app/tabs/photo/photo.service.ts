import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  url:string= "http://127.0.0.1:8000/api/photos/";
  private photo = {};
  private error;

  public constructor(private http : HttpClient){}

  /**
   * Method POST to add photo to database.
   * @param photo 
   */
  public add(photo: any){
    return this.http.post<any>(this.url, photo);
  }

  /**
   * Method GET for get photo
   * @param id photo
   */
  public get(id: Number){
    return this.http.get<any>(this.url + id);
  }

  /**
   * Method DELETE for delete photo
   * @param id photo
   */
  public delete(id: Number){
    return this.http.delete<any>(this.url + id);
  }

  public clearTmp(id: String){
    return this.http.delete<any>(this.url + "deleteTmpFile/" + id)
  }

    /**
   * Fonction to delete files
   * store in tmp.
   */
  public clearTmpFiles(idsPhoto){
    if(idsPhoto) {
      for(let i=0; i < idsPhoto.length; i++){
        
        // Retreive index of tmpPhoto in photos array
        this.clearTmp(idsPhoto[i].toString())
        .subscribe(reponse => {
          let index = idsPhoto.findIndex((id) => id == idsPhoto[i])
          idsPhoto.splice(index, 1);
        });
      }
    }
  }
}