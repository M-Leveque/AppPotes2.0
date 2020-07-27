<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class ImageService
{
    const PRIVATE_STATUS = 0;
    const PUBLIC_STATUS = 0;

    /**
     * This function store b64 image 
     * on serveur public storage.
     * @param image
     * @param name
     */
    public static function uploadB64Img($b64File, $path) {

        $b64File = str_replace('data:image/png;base64,', '', $b64File);
        $b64File = str_replace(' ', '+', $b64File);

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

    public static function generatePath($path, $imgName, $folder = null) {
        if($folder) $path .= $folder.'/';
        return $path.$imgName.'.png';
    }
}