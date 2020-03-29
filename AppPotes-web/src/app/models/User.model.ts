export class User{
    constructor(
        public id: Number,
        public name: String,
        public email: String,
        public password: String = null,
        public token: String = null
    ){}
}