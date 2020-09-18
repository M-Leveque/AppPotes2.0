import {User} from './User.model';
import {Photo} from './Photo.model';

export class Album {
    constructor(
        public id: Number = undefined,
        public name: String = "",
        public description: String = "",
        public status: boolean = true,
        public date: String = undefined,
        public id_photo: String = undefined,
        public User: User = undefined,
        public Photos: Photo[] = undefined
    ){}

}