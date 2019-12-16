import {User} from './User.model';
import {Photo} from './Photo.model';

export class Album {
    constructor(
        public id: Number = undefined,
        public name: String = "",
        public description: String = "",
        public date: String = undefined,
        public artwork: String = undefined,
        public User: User = undefined,
        public Photos: Photo[] = undefined
    ){}

}