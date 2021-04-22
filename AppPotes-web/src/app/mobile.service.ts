
export class MobileService {

    public isMobile: Boolean;

    public isMobileDevice(screenWith){
        this.isMobile = screenWith <= 720;
    }
}