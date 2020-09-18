import { ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';

export class Photo {
    constructor(
        public id: Number = null,
        public name: String,
        public path: String = null,
        public b64_image: any = null,
        public id_album: Number = null
    ){}
}