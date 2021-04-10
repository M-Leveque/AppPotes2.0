import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Photo } from 'src/app/models/Photo.model';
import { ConstantService } from 'src/app/constant.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  httpOptions = {};
  basePath:string= "api/photos/";
  private photo = {};
  private error;

  public constructor(private http : HttpClient,
    private constant: ConstantService){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer gokKqRpQvqo2cdpc1hTM7H1BTeOPfIl6TuFWasUZmIwr0YzFaCX4amieEbtg'
      })
    };
  }

  /**
   * Method POST to add photo to database.
   * @param photo 
   */
  public add(photo: Photo){
    return this.http.post<any>(this.constant.host+this.basePath, photo, this.httpOptions);
  }

  /**
   * Method PUT to update photo in database.
   * @param photo 
   */
  public update(newPhoto: Photo, idOldPhoto: Number){
    return this.http.put<any>(this.constant.host+this.basePath+idOldPhoto, newPhoto, this.httpOptions);
  }

  /**
   * Method GET for get photo
   * @param id photo
   */
  public get(id: Number){
    return this.http.get<any>(this.constant.host+this.basePath + id, this.httpOptions);
  }

  /**
   * Method GET for get photo file
   * @param id 
   * @param isThumb
   * @param src : Source to return image to base64
   */
  public get64File(id: Number, isThumb: boolean) {
    return new Observable((observer) => {
        this.http.get<any>(this.constant.host+this.basePath+'file/'+id+"/"+isThumb, { responseType: 'blob' as 'json'}).subscribe(
          (file) => {
            var reader = new FileReader();
            reader.readAsDataURL(file); 
            reader.onloadend = function() {
              observer.next(reader.result);
            }
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }

  /**
   * Method GET for get photos
   * by albums
   * @param id 
   */
  public getByAlbum(id: Number){
    return this.http.get<any>(this.constant.host+this.basePath +"byAlbum/"+ id, this.httpOptions);
  }

  /**
   * Method DELETE for delete photo
   * @param id photo
   */
  public delete(id: Number){
    return this.http.delete<any>(this.constant.host+this.basePath + id, this.httpOptions);
  }

  public clearTmp(id: String){
    return this.http.delete<any>(this.constant.host+this.basePath + "deleteTmpFile/" + id, this.httpOptions)
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
