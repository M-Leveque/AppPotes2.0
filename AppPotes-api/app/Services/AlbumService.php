<?php

namespace App\Services;

use App\Album;
use App\Photo;
use App\Shared\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AlbumService
{
    const PRIVATE_STATUS = 0;
    const PUBLIC_STATUS = 0;

    /**
     * This function store album cover 
     * on serveur public storage.
     * @param cover
     * @param name
     */
    public static function uploadImg($b64File, $path) {

        $b64File = str_replace('data:image/png;base64,', '', $b64File);
        $b64File = str_replace(' ', '+', $b64File);

        // Store album cover on server
        Storage::disk('public')->put(Constants::IMG_PATH.$path, base64_decode($b64File));

    }

    /**
     * This function move files
     * from tmp to album folder.
     * @param id
     * @param path
     */
    public static function moveImg($id, $path){
        $tmpFile = Constants::IMG_PATH.'tmp/'.$id.'.png';
        $file = Constants::IMG_PATH.$path;

        Storage::disk('public')->move($tmpFile, $file);
        
    }

    /**
     * This prepare and persist new album.
     * @param $cover
     * @param $name
     * @param $description
     * @param $photos
     */
    public function create($cover, $name, $description, $idsPhoto) {

        // Create new album object
        $album = new Album();

        $this->persist($album, $name, $description, $cover, $idsPhoto);

    }

    /**
     * This function update existing album
     * @param $id
     * @param $name
     * @param $description
     * @param $photos
     */
    public function update($id, $cover, $name, $description, $idsPhoto) {

        // Create new album object
        $album = Album::find($id);

        // If cover change -> delete oldCover
        if($cover){
            $this->deleteOldCover($album->artwork);
        }

        $this->persist($album, $name, $description, $cover, $idsPhoto);
    }

    /**
     * This function persist existing or not
     * album in database.
     * @param $album
     * @param $name
     * @param $description
     * @param $path
     */
    private function persist($album, $name, $description, $cover, $idsPhoto){

        // Date now
        $now = Carbon::now();

        $album->name = $name;
        $album->description = $description;
        $album->status = self::PUBLIC_STATUS;
        $album->date = $now->toDateTimeString();
        $album->date_created = $now->toDateTimeString();
        $album->id_user = 1;
        
        // Persist album
        $album->save();

        // Move tmp img to albums.
        if($cover){
            $path = $this->generatePath($album->id.'-'.$now->timestamp);
            self::moveImg($cover, $path);

            $album->artwork = $path;
            $album->save();
        }
        

        $photos = [];

        // Move photo tmp store to album.
        if(!empty($idsPhoto)){
            foreach($idsPhoto as $id){
                $path = $this->generatePath($id, $album->id);
                self::moveImg($id, $path);
                array_push($photos, $this->convertPhoto($id, $path));
            }
        }

        // Persist photos
        $album->photos()->saveMany($photos);
    }

    public function convertPhoto($id, $path) {

        // Date now
        $now = Carbon::now();
        
        $photo = new Photo();
        $photo->name = $id;
        $photo->path = $path;
        $photo->date = $now->toDateTimeString();
        $photo->date_upload = $now->toDateTimeString();
        $photo->id_user = 1;

        return $photo;
    }

        /**
     * This function store album cover 
     * on serveur public storage.
     * @param cover
     * @param name
     */
    private function deleteOldCover($artwork){
        // Store album cover on server
        Storage::disk('public')->delete(Constants::IMG_PATH.$artwork);
    }

    private function generatePath($name,$idAlbum = null){

        $path = "";
        if($idAlbum) $path .= $idAlbum.'/';
        return $path.$name.'.png';
    }
}