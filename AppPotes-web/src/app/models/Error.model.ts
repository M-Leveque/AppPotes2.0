export class Error {
    
    private code: number;
    public errorMsg = {
        100: "L'album n'est pas valide" ,
        101: "L'album contient un champs non valide",
        102: "L'album exist déjà",
        103: "L'album n'exist pas",
        104: "Vous n'êtes pas authorisé à modfier cet album",
        200: "La photo n'est pas valide",
        201: "La photo exsite déjà",
        202: "La photo n'existe pas",
        203: "Vous n'êtes pas authoerisé à modfier cette photo",
    }

    constructor(code: number){
        this.code = code;
    }

    public getMessage() : string{
        return this.errorMsg[this.code];
    }
}