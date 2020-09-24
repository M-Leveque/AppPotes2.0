export class ImageUtils {

    

    formatSrcToB64Image(b64_image){
        var b64 = "";
        var baliseb64 = "base64";
        var indexStart = b64_image.indexOf(baliseb64);
        if(b64 != null){
          b64 = b64_image.substring(indexStart + baliseb64.length);
        }
        return b64;
      }
}