import { Photo } from './Photo.model';

export class User{
    constructor(
        public id: Number,
        public name: String,
        public email: String,
        public description: String = null,
        public password: String = null,
        public token: String = null,
        public photo : Photo = null,
    ){}
}