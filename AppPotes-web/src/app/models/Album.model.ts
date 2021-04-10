import {User} from './User.model';
import {Photo} from './Photo.model';

export class Album {
    constructor(
        public id: Number = undefined,
        public name: String = "",
        public description: String = "",
        public status: boolean = true,
        public date: String = undefined,
        public id_photo: Number = undefined,
        public id_user: Number = undefined,
        public user: User = undefined,
        public photos: Photo[] = undefined,
        public photo: Photo = undefined
    ){}

}