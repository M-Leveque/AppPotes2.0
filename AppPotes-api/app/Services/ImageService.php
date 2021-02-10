<?php

namespace App\Services;

use App\Exceptions\PhotoException;
use app\Shared\Constants;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageService
{
    const PRIVATE_STATUS = 0;
    const PUBLIC_STATUS = 0;

    /**
     * format accepted
     */
    const FILE_FORMAT_REGEX = "(jpg|jpeg|png|tiff)";

    /**
     * This function store b64 image 
     * on serveur public storage.
     * @param image
     * @param name
     */
    public static function uploadB64Img($b64File, $path) {

        // Store album cover on server
        Storage::disk('public')->put($path, base64_decode($b64File));

    }

    /**
     * This function delete image
     * on serveur public storage.
     * @param cover
     * @param name
     */
    public static function deleteImage($path){
        // Delete Image on cover
        Storage::disk('public')->delete($path);
    }

    public static function generatePath($path, $imgName, $ext, $folder = null) {
        if($folder) $path .= $folder;
        return $path.$imgName.'.'.$ext;
    }

    public static function formatB64($bruteB64File){
        $bruteB64File = preg_replace('~data:image/'.self::FILE_FORMAT_REGEX.';base64,~', '', $bruteB64File);
        $bruteB64File = str_replace(' ', '+', $bruteB64File);
        return $bruteB64File;
    }

    public static function getImageType($b64File){
        $matches = null;
        preg_match("~".self::FILE_FORMAT_REGEX."~", $b64File, $matches, PREG_OFFSET_CAPTURE);
        if(empty($matches) || empty($matches[0])){
            throw new PhotoException(PhotoException::PHOTO_NOT_VALID , PhotoException::createError('photo', 'Photo extension is not valid'));
        }
        return $matches[0][0];
        
    }

    /**
     * Create a thumbnail of specified size
     *
     * @param string $path path of thumbnail
     * @param int $width
     * @param int $height
     */
    public static function createThumbnail($path, $width, $height)
    {
        $path = public_path($path);
        $img = Image::make($path)->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->save($path);
    }
}