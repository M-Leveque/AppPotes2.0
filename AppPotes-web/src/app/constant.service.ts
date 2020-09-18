import { User } from './models/User.model';

export class ConstantService {

    host: String = "http://localhost:8000/";
    path: Object = {
        "albums" : "/img/albums/",
        "profiles": "/img/profiles/"
    }
}