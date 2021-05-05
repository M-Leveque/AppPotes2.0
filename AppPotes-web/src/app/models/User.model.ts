import { Photo } from './Photo.model';

export class User{
    constructor(
        public id: Number,
        public name: String,
        public description: String,
        public email: String,
        public password: String = null,
        public token: String = null,
        public photo : Photo = null,
    ){}
}