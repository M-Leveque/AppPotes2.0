import {User} from './User.model';
import {Photo} from './Photo.model';

export class Album {
    constructor(
        public id: Number,
        public name: String,
        public description: String,
        public date: String,
        public artwork: String,
        public User: User,
        public Photos: Photo[]
    ){}
}