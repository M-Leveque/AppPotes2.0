import { environment } from './../environments/environment';

export class ConstantService {

    TEXT_FIELD_PATTERN: string = "^[A-Za-zÀ-ÖØ-öø-ÿ0-9 '_-]+$";
    host: string = environment.apiUrl;
    path = {
        albums : "storage/img/albums/",
        photos : {
            default: "/assets/img/default.jpg"
        }
    }
    isMobileDevice = true;
}