import { User } from './models/User.model';

export class ConstantService {

    TEXT_FIELD_PATTERN: string = "^[a-zA-Z0-9 _-]+$";
    host: string = "http://localhost:8000/";
    path: Object = {
        "albums" : "storage/img/albums/"
    }
}