<?php

namespace App\Services;

use Carbon\Carbon;
use App\Photo;

class PhotoService
{
    /**
     * convert data to photo object
     */
    public static function convertPhoto($id, $path) {
        $now = Carbon::now();
        $photo = new Photo();
        $photo->name = $id;
        $photo->path = $path;
        $photo->date = $now->toDateTimeString();
        $photo->date_upload = $now->toDateTimeString();
        $photo->id_user = 1;
        return $photo;
    }
}